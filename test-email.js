// Script de test pour l'envoi d'email
const nodemailer = require('nodemailer');
require('dotenv').config({ path: './config.env' });

async function testEmail() {
    console.log('🧪 Test d\'envoi d\'email...');
    
    // Configuration du transporteur
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Données de test
    const testSubmission = {
        email: 'test@example.com',
        telegram: '+261341234567',
        offerName: 'PREMIUM - La Totale',
        offerPrice: 990000,
        timestamp: new Date().toISOString()
    };

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECIPIENT,
        subject: `🧪 TEST - NOUVELLE OFRE CONFIRMÉE - FXEMPEROR & RUGA`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px;">🧪 TEST - NOUVELLE OFRE CONFIRMÉE</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">FXEMPEROR & RUGA - Formation Trading</p>
                </div>
                
                <div style="background: white; padding: 20px; border-radius: 10px; margin-top: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">📋 Informations du Client (TEST)</h2>
                    
                    <div style="margin: 20px 0;">
                        <p><strong>📧 Email:</strong> <span style="color: #667eea;">${testSubmission.email}</span></p>
                        <p><strong>📱 Telegram:</strong> <span style="color: #667eea;">${testSubmission.telegram}</span></p>
                    </div>
                    
                    <h3 style="color: #333; margin-top: 25px;">💎 Détails de l'Offre</h3>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
                        <p><strong>🎯 Offre Sélectionnée:</strong> <span style="color: #28a745; font-weight: bold;">${testSubmission.offerName}</span></p>
                        <p><strong>💰 Prix:</strong> <span style="color: #dc3545; font-weight: bold;">${new Intl.NumberFormat('fr-MG').format(testSubmission.offerPrice)} Ar</span></p>
                        <p><strong>⏰ Date de Confirmation:</strong> <span style="color: #6c757d;">${new Date(testSubmission.timestamp).toLocaleString('fr-FR')}</span></p>
                    </div>
                    
                    <div style="background: #e8f5e8; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                        <p style="margin: 0; color: #155724;"><strong>✅ Statut:</strong> En attente de paiement</p>
                    </div>
                </div>
                
                <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                    <p style="margin: 0; color: #856404;"><strong>⚠️ Action Requise:</strong> Contacter le client pour finaliser le paiement et organiser la formation.</p>
                </div>
                
                <div style="text-align: center; margin-top: 30px; color: #6c757d; font-size: 14px;">
                    <p><strong>🧪 Ceci est un email de test pour vérifier la configuration</strong></p>
                    <p>Cet email a été généré automatiquement par le système FXEMPEROR & RUGA</p>
                    <p>© 2024 FXEMPEROR & RUGA - Maîtrisez l'Art du Trading</p>
                </div>
            </div>
        `
    };

    try {
        console.log('📧 Tentative d\'envoi d\'email...');
        console.log('📤 De:', process.env.EMAIL_USER);
        console.log('📥 Vers:', process.env.EMAIL_RECIPIENT);
        
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email de test envoyé avec succès!');
        console.log('📧 Message ID:', info.messageId);
        console.log('📧 Réponse:', info.response);
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'envoi de l\'email de test:', error);
        console.error('🔍 Détails de l\'erreur:', error.message);
    }
}

// Exécuter le test
testEmail(); 