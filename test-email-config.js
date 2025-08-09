// Script de test pour vérifier la configuration email
// Utilisez ce script pour diagnostiquer les problèmes d'envoi d'email

console.log('🧪 Test de configuration email pour FXEMPEROR & RUGA\n');

// Vérifier les variables d'environnement
console.log('📋 Vérification des variables d\'environnement :');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✅ Configuré' : '❌ Non configuré');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Configuré' : '❌ Non configuré');

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('\n❌ PROBLÈME IDENTIFIÉ :');
    console.log('Les variables d\'environnement EMAIL_USER et EMAIL_PASS ne sont pas configurées.');
    console.log('\n🔧 SOLUTION :');
    console.log('1. Allez sur votre dashboard Netlify');
    console.log('2. Site settings > Environment variables');
    console.log('3. Ajoutez :');
    console.log('   - EMAIL_USER = votre_email@gmail.com');
    console.log('   - EMAIL_PASS = votre_mot_de_passe_app_gmail');
    console.log('\n📧 Pour Gmail, vous devez :');
    console.log('1. Activer l\'authentification à 2 facteurs');
    console.log('2. Créer un mot de passe d\'application');
    console.log('3. Utiliser ce mot de passe dans EMAIL_PASS');
} else {
    console.log('\n✅ Configuration email détectée !');
    console.log('Test d\'envoi d\'email...');
    
    // Test d'envoi d'email
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    const testEmail = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: '🧪 Test email FXEMPEROR & RUGA',
        html: `
            <h2>🧪 Test de configuration email</h2>
            <p>Si vous recevez cet email, la configuration est correcte !</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
            <p><strong>Environnement:</strong> ${process.env.NODE_ENV || 'développement'}</p>
        `
    };
    
    transporter.sendMail(testEmail, (error, info) => {
        if (error) {
            console.log('❌ Erreur lors de l\'envoi du test :', error.message);
            console.log('\n🔧 Problèmes courants :');
            console.log('- Mot de passe Gmail incorrect');
            console.log('- Authentification à 2 facteurs non activée');
            console.log('- Mot de passe d\'application non créé');
            console.log('- Compte Gmail verrouillé');
        } else {
            console.log('✅ Email de test envoyé avec succès !');
            console.log('Message ID:', info.messageId);
            console.log('Vérifiez votre boîte de réception.');
        }
    });
}

console.log('\n📚 Documentation complète :');
console.log('https://support.google.com/accounts/answer/185833');
console.log('https://docs.netlify.com/environment-variables/get-started/'); 