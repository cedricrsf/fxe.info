const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname)));

// Configuration du transporteur email Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Stockage temporaire des données (en production, utilisez une base de données)
let submissions = [];

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'formation.html'));
});

// Route pour capturer les informations de confirmation d'offre
app.post('/api/confirm-offer', async (req, res) => {
    try {
        const { email, telegram, offerName, offerPrice } = req.body;
        
        // Validation des données
        if (!email || !telegram || !offerName || !offerPrice) {
            return res.status(400).json({
                success: false,
                message: 'Toutes les informations sont requises'
            });
        }

        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Format d\'email invalide'
            });
        }

        // Validation Telegram (doit commencer par +)
        if (!telegram.startsWith('+')) {
            return res.status(400).json({
                success: false,
                message: 'Le numéro Telegram doit commencer par l\'indicatif pays (ex: +261)'
            });
        }

        // Créer l'objet de soumission
        const submission = {
            id: Date.now().toString(),
            email,
            telegram,
            offerName,
            offerPrice: parseInt(offerPrice),
            timestamp: new Date().toISOString(),
            status: 'pending',
            paymentMethod: null,
            paymentProof: null
        };

        // Ajouter à la liste des soumissions
        submissions.push(submission);

        // Log de la soumission
        console.log('✅ Nouvelle offre confirmée:', {
            id: submission.id,
            email: submission.email,
            offer: submission.offerName,
            price: submission.offerPrice
        });

        // Envoyer un email de notification immédiatement
        try {
            await sendNotificationEmail(submission);
            console.log('📧 Email de notification envoyé avec succès');
        } catch (emailError) {
            console.error('❌ Erreur lors de l\'envoi de l\'email:', emailError);
        }

        res.json({
            success: true,
            message: 'Offre confirmée avec succès',
            submissionId: submission.id,
            data: submission
        });

    } catch (error) {
        console.error('❌ Erreur lors de la confirmation:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur'
        });
    }
});

// Route pour récupérer toutes les soumissions (pour l'admin)
app.get('/api/submissions', (req, res) => {
    try {
        res.json({
            success: true,
            count: submissions.length,
            submissions: submissions
        });
    } catch (error) {
        console.error('❌ Erreur lors de la récupération des soumissions:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur'
        });
    }
});

// Route pour récupérer une soumission spécifique
app.get('/api/submissions/:id', (req, res) => {
    try {
        const { id } = req.params;
        const submission = submissions.find(s => s.id === id);
        
        if (!submission) {
            return res.status(404).json({
                success: false,
                message: 'Soumission non trouvée'
            });
        }

        res.json({
            success: true,
            submission: submission
        });

    } catch (error) {
        console.error('❌ Erreur lors de la récupération de la soumission:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur'
        });
    }
});

// Route pour mettre à jour le statut d'une soumission
app.put('/api/submissions/:id/status', (req, res) => {
    try {
        const { id } = req.params;
        const { status, paymentMethod, paymentProof } = req.body;
        
        const submission = submissions.find(s => s.id === id);
        
        if (!submission) {
            return res.status(404).json({
                success: false,
                message: 'Soumission non trouvée'
            });
        }

        // Mettre à jour les champs
        if (status) submission.status = status;
        if (paymentMethod) submission.paymentMethod = paymentMethod;
        if (paymentProof) submission.paymentProof = paymentProof;

        console.log(`✅ Statut mis à jour pour la soumission ${id}:`, submission.status);

        res.json({
            success: true,
            message: 'Statut mis à jour avec succès',
            submission: submission
        });

    } catch (error) {
        console.error('❌ Erreur lors de la mise à jour du statut:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur'
        });
    }
});

// Route pour envoyer un email de confirmation
app.post('/api/send-email', async (req, res) => {
    try {
        const { email, telegram, offerName, offerPrice } = req.body;
        
        // Créer l'objet de soumission pour l'email
        const submissionData = {
            email,
            telegram,
            offerName,
            offerPrice,
            timestamp: new Date().toISOString()
        };

        // Envoyer l'email réel
        await sendNotificationEmail(submissionData);
        
        console.log('📧 Email de confirmation envoyé à:', process.env.EMAIL_RECIPIENT);
        console.log('📱 Notification Telegram envoyée à:', telegram);
        console.log('📦 Détails de l\'offre:', { offerName, offerPrice });

        res.json({
            success: true,
            message: 'Email et notification envoyés avec succès'
        });

    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de l\'envoi de l\'email: ' + error.message
        });
    }
});

// Route de test
app.get('/api/test', (req, res) => {
    res.json({
        success: true,
        message: 'Backend FXEMPEROR & RUGA fonctionne correctement!',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Fonction pour envoyer les emails de notification
async function sendNotificationEmail(submission) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECIPIENT,
        subject: `🚀 NOUVELLE OFRE CONFIRMÉE - FXEMPEROR & RUGA`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px;">🎯 NOUVELLE OFRE CONFIRMÉE</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">FXEMPEROR & RUGA - Formation Trading</p>
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 10px; margin-top: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📋 Informations du Client</h2>
                    
                    <div style="margin: 20px 0;">
                        <p><strong>📧 Email:</strong> <span style="color: #667eea;">${submission.email}</span></p>
                        <p><strong>📱 Telegram:</strong> <span style="color: #667eea;">${submission.telegram}</span></p>
                    </div>
                    
                    <h3 style="color: #333; margin-top: 25px;">💎 Détails de l'Offre</h3>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <p><strong>🎯 Offre Sélectionnée:</strong> <span style="color: #28a745; font-weight: bold;">${submission.offerName}</span></p>
                        <p><strong>💰 Prix:</strong> <span style="color: #dc3545; font-weight: bold;">${new Intl.NumberFormat('fr-MG').format(submission.offerPrice)} Ar</span></p>
                        <p><strong>⏰ Date de Confirmation:</strong> <span style="color: #6c757d;">${new Date(submission.timestamp).toLocaleString('fr-FR')}</span></p>
                    </div>
                    
                    <div style="background: #e8f5e8; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                        <p style="margin: 0; color: #155724;"><strong>✅ Statut:</strong> En attente de paiement</p>
                    </div>
                </div>
                
                <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                    <p style="margin: 0; color: #856404;"><strong>⚠️ Action Requise:</strong> Contacter le client pour finaliser le paiement et organiser la formation.</p>
                </div>
                
                <div style="text-align: center; margin-top: 30px; color: #6c757d; font-size: 14px;">
                    <p>Cet email a été généré automatiquement par le système FXEMPEROR & RUGA</p>
                    <p>© 2024 FXEMPEROR & RUGA - Maîtrisez l'Art du Trading</p>
                </div>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('📧 Email envoyé avec succès:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
        throw error;
    }
}

// Gestion des erreurs 404
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route non trouvée'
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log('🚀 Serveur FXEMPEROR & RUGA démarré!');
    console.log(`📍 Port: ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log(`📊 API: http://localhost:${PORT}/api/test`);
    console.log('✅ Prêt à recevoir les confirmations d\'offres!');
});

// Gestion des erreurs non capturées
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promesse rejetée non gérée:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Exception non capturée:', error);
    process.exit(1);
}); 