// Configuration pour les emails FXEMPEROR & RUGA
module.exports = {
    // Adresse email de notification
    NOTIFICATION_EMAIL: 'rasolofoarijaonacedric30@gmail.com',
    
    // Configuration Gmail
    GMAIL_CONFIG: {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    },
    
    // Templates d'emails
    EMAIL_TEMPLATES: {
        // Template pour nouvelle offre confirmée
        NEW_OFFER: (submission) => ({
            subject: `🚀 Nouvelle offre confirmée - ${submission.offerName}`,
            html: `
                <h2>🎯 Nouvelle offre confirmée</h2>
                <p><strong>Offre:</strong> ${submission.offerName}</p>
                <p><strong>Prix:</strong> ${submission.offerPrice} Ar</p>
                <p><strong>Email:</strong> ${submission.email}</p>
                <p><strong>Telegram:</strong> ${submission.telegram}</p>
                <p><strong>Date:</strong> ${new Date(submission.timestamp).toLocaleString('fr-FR')}</p>
                <p><strong>ID:</strong> ${submission.id}</p>
                <hr>
                <p><em>Email envoyé automatiquement depuis l'API FXEMPEROR & RUGA</em></p>
            `
        }),
        
        // Template pour paiement reçu
        PAYMENT_RECEIVED: (submission) => ({
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
                <hr>
                <p><em>Email envoyé automatiquement depuis l'API FXEMPEROR & RUGA</em></p>
            `
        })
    }
}; 