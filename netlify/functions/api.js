const nodemailer = require('nodemailer');

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

exports.handler = async (event, context) => {
    // Gestion CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    // Gestion des requêtes OPTIONS (preflight)
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        const { path } = event;
        const body = JSON.parse(event.body || '{}');

        // Route pour capturer les informations de confirmation d'offre
        if (path === '/api/confirm-offer' && event.httpMethod === 'POST') {
            const { email, telegram, offerName, offerPrice } = body;
            
            // Validation des données
            if (!email || !telegram || !offerName || !offerPrice) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({
                        success: false,
                        message: 'Toutes les informations sont requises'
                    })
                };
            }

            // Validation email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({
                        success: false,
                        message: 'Format d\'email invalide'
                    })
                };
            }

            // Validation Telegram (doit commencer par +)
            if (!telegram.startsWith('+')) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({
                        success: false,
                        message: 'Le numéro Telegram doit commencer par l\'indicatif pays (ex: +261)'
                    })
                };
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

            // Envoyer un email de notification
            try {
                await sendNotificationEmail(submission);
                console.log('📧 Email de notification envoyé avec succès');
            } catch (emailError) {
                console.error('❌ Erreur lors de l\'envoi de l\'email:', emailError);
            }

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    message: 'Offre confirmée avec succès',
                    submissionId: submission.id
                })
            };
        }

        // Route pour le processus de paiement
        if (path === '/api/process-payment' && event.httpMethod === 'POST') {
            const { submissionId, paymentMethod, paymentProof } = body;
            
            if (!submissionId || !paymentMethod || !paymentProof) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({
                        success: false,
                        message: 'Toutes les informations de paiement sont requises'
                    })
                };
            }

            const submission = submissions.find(s => s.id === submissionId);
            if (!submission) {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({
                        success: false,
                        message: 'Soumission non trouvée'
                    })
                };
            }

            // Mettre à jour la soumission
            submission.paymentMethod = paymentMethod;
            submission.paymentProof = paymentProof;
            submission.status = 'payment_received';

            // Envoyer un email de confirmation de paiement
            try {
                await sendPaymentConfirmationEmail(submission);
                console.log('📧 Email de confirmation de paiement envoyé');
            } catch (emailError) {
                console.error('❌ Erreur lors de l\'envoi de l\'email de confirmation:', emailError);
            }

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    message: 'Paiement traité avec succès',
                    submission: submission
                })
            };
        }

        // Route par défaut
        return {
            statusCode: 404,
            headers,
            body: JSON.stringify({
                success: false,
                message: 'Route non trouvée'
            })
        };

    } catch (error) {
        console.error('❌ Erreur serveur:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                message: 'Erreur interne du serveur'
            })
        };
    }
};

// Fonction pour envoyer un email de notification
async function sendNotificationEmail(submission) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Notification pour l'admin
        subject: `🚀 Nouvelle offre confirmée - ${submission.offerName}`,
        html: `
            <h2>🎯 Nouvelle offre confirmée</h2>
            <p><strong>Offre:</strong> ${submission.offerName}</p>
            <p><strong>Prix:</strong> ${submission.offerPrice} Ar</p>
            <p><strong>Email:</strong> ${submission.email}</p>
            <p><strong>Telegram:</strong> ${submission.telegram}</p>
            <p><strong>Date:</strong> ${new Date(submission.timestamp).toLocaleString('fr-FR')}</p>
            <p><strong>ID:</strong> ${submission.id}</p>
        `
    };

    return transporter.sendMail(mailOptions);
}

// Fonction pour envoyer un email de confirmation de paiement
async function sendPaymentConfirmationEmail(submission) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Notification pour l'admin
        subject: `💳 Paiement reçu - ${submission.offerName}`,
        html: `
            <h2>💳 Paiement reçu</h2>
            <p><strong>Offre:</strong> ${submission.offerName}</p>
            <p><strong>Prix:</strong> ${submission.offerPrice} Ar</p>
            <p><strong>Email:</strong> ${submission.email}</p>
            <p><strong>Telegram:</strong> ${submission.telegram}</p>
            <p><strong>Méthode de paiement:</strong> ${submission.paymentMethod}</p>
            <p><strong>Preuve de paiement:</strong> ${submission.paymentProof}</p>
            <p><strong>Date:</strong> ${new Date(submission.timestamp).toLocaleString('fr-FR')}</p>
            <p><strong>ID:</strong> ${submission.id}</p>
        `
    };

    return transporter.sendMail(mailOptions);
} 