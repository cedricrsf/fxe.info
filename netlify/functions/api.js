const nodemailer = require('nodemailer');
const config = require('./config');

// Configuration du transporteur email Gmail
const transporter = nodemailer.createTransport(config.GMAIL_CONFIG);

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

        // Route de test pour vérifier que l'API fonctionne
        if (path === '/api/test' && event.httpMethod === 'GET') {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    message: '🚀 API FXEMPEROR & RUGA fonctionne parfaitement !',
                    timestamp: new Date().toISOString(),
                    environment: 'Netlify Functions',
                    version: '1.0.0'
                })
            };
        }

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
            let emailSent = false;
            let emailError = null;
            
            try {
                if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
                    throw new Error('Variables d\'environnement EMAIL_USER et EMAIL_PASS non configurées');
                }
                
                await sendNotificationEmail(submission);
                console.log('📧 Email de notification envoyé avec succès');
                emailSent = true;
            } catch (emailError) {
                console.error('❌ Erreur lors de l\'envoi de l\'email:', emailError);
                emailError = emailError.message;
            }

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    message: 'Offre confirmée avec succès',
                    submissionId: submission.id,
                    emailStatus: {
                        sent: emailSent,
                        error: emailError || null
                    }
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

        // Route pour obtenir le statut d'une soumission
        if (path === '/api/submission-status' && event.httpMethod === 'GET') {
            const { submissionId } = event.queryStringParameters || {};
            
            if (!submissionId) {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({
                        success: false,
                        message: 'ID de soumission requis'
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

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
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
                message: 'Route non trouvée',
                availableRoutes: [
                    'GET /api/test',
                    'POST /api/confirm-offer',
                    'POST /api/process-payment',
                    'GET /api/submission-status'
                ]
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
    // Vérifier la configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('Configuration email manquante: EMAIL_USER et EMAIL_PASS requis');
    }

    const template = config.EMAIL_TEMPLATES.NEW_OFFER(submission);
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: config.NOTIFICATION_EMAIL,
        subject: template.subject,
        html: template.html
    };

    console.log('📧 Tentative d\'envoi d\'email à:', config.NOTIFICATION_EMAIL);
    const result = await transporter.sendMail(mailOptions);
    console.log('📧 Email envoyé avec succès:', result.messageId);
    return result;
}

// Fonction pour envoyer un email de confirmation de paiement
async function sendPaymentConfirmationEmail(submission) {
    const template = config.EMAIL_TEMPLATES.PAYMENT_RECEIVED(submission);
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: config.NOTIFICATION_EMAIL,
        subject: template.subject,
        html: template.html
    };

    console.log('📧 Tentative d\'envoi d\'email de confirmation à:', config.NOTIFICATION_EMAIL);
    const result = await transporter.sendMail(mailOptions);
    console.log('📧 Email de confirmation envoyé avec succès:', result.messageId);
    return result;
} 