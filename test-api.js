// Script de test pour l'API FXEMPEROR & RUGA
// Utilisez ce script pour tester votre API après déploiement

const API_BASE_URL = 'https://votre-site.netlify.app'; // Remplacez par votre URL Netlify

// Test de la route de test
async function testAPI() {
    try {
        console.log('🧪 Test de l\'API FXEMPEROR & RUGA...\n');
        
        // Test 1: Route de test
        console.log('1️⃣ Test de la route /api/test');
        const testResponse = await fetch(`${API_BASE_URL}/api/test`);
        const testData = await testResponse.json();
        console.log('✅ Réponse:', testData);
        console.log('');
        
        // Test 2: Confirmation d'offre
        console.log('2️⃣ Test de la route /api/confirm-offer');
        const offerData = {
            email: 'test@example.com',
            telegram: '+261123456789',
            offerName: 'Formation Trading Premium',
            offerPrice: 50000
        };
        
        const offerResponse = await fetch(`${API_BASE_URL}/api/confirm-offer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(offerData)
        });
        
        const offerResult = await offerResponse.json();
        console.log('✅ Réponse:', offerResult);
        
        if (offerResult.success && offerResult.submissionId) {
            console.log('📝 ID de soumission:', offerResult.submissionId);
            
            // Test 3: Vérification du statut
            console.log('\n3️⃣ Test de la route /api/submission-status');
            const statusResponse = await fetch(`${API_BASE_URL}/api/submission-status?submissionId=${offerResult.submissionId}`);
            const statusData = await statusResponse.json();
            console.log('✅ Statut de la soumission:', statusData);
        }
        
        console.log('\n🎉 Tous les tests sont passés avec succès !');
        console.log('🚀 Votre API est prête pour la production.');
        
    } catch (error) {
        console.error('❌ Erreur lors du test:', error);
        console.log('\n🔧 Vérifiez que :');
        console.log('   - Votre site Netlify est déployé');
        console.log('   - L\'URL est correcte dans API_BASE_URL');
        console.log('   - Les variables d\'environnement sont configurées');
    }
}

// Instructions d'utilisation
console.log('📋 Instructions d\'utilisation :');
console.log('1. Remplacez API_BASE_URL par votre URL Netlify');
console.log('2. Assurez-vous que votre site est déployé');
console.log('3. Exécutez : node test-api.js\n');

// Exécuter le test si l'URL est configurée
if (API_BASE_URL !== 'https://votre-site.netlify.app') {
    testAPI();
} else {
    console.log('⚠️  Veuillez configurer API_BASE_URL avec votre URL Netlify');
} 