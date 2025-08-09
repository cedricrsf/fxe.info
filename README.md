# FXEMPEROR & RUGA - Backend Server

## 🚀 Description

Backend server pour la plateforme de formation en trading FXEMPEROR & RUGA. Ce serveur capture et gère les informations des utilisateurs qui confirment leurs offres de formation.

## 📋 Fonctionnalités

- ✅ Capture des informations de confirmation d'offre
- ✅ Validation des données (email, télégram)
- ✅ Stockage temporaire des soumissions
- ✅ API REST complète
- ✅ Gestion des erreurs robuste
- ✅ Logs détaillés

## 🛠️ Installation

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone <votre-repo>
cd fxe-tsotre
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer le serveur**
```bash
# Mode développement (avec auto-reload)
npm run dev

# Mode production
npm start
```

## 🌐 Utilisation

### Démarrage du serveur
Le serveur démarre sur le port 3000 par défaut :
- **URL locale** : http://localhost:3000
- **API de test** : http://localhost:3000/api/test

### Routes API disponibles

#### 1. Confirmation d'offre
```http
POST /api/confirm-offer
Content-Type: application/json

{
  "email": "user@example.com",
  "telegram": "+261341234567",
  "offerName": "PREMIUM - La Totale",
  "offerPrice": 990000
}
```

#### 2. Récupération des soumissions
```http
GET /api/submissions
```

#### 3. Récupération d'une soumission spécifique
```http
GET /api/submissions/:id
```

#### 4. Mise à jour du statut
```http
PUT /api/submissions/:id/status
Content-Type: application/json

{
  "status": "paid",
  "paymentMethod": "USDT",
  "paymentProof": "tx_hash_123"
}
```

#### 5. Envoi d'email
```http
POST /api/send-email
Content-Type: application/json

{
  "email": "user@example.com",
  "telegram": "+261341234567",
  "offerName": "PREMIUM - La Totale",
  "offerPrice": 990000
}
```

## 📊 Structure des données

### Soumission d'offre
```json
{
  "id": "1703123456789",
  "email": "user@example.com",
  "telegram": "+261341234567",
  "offerName": "PREMIUM - La Totale",
  "offerPrice": 990000,
  "timestamp": "2023-12-21T10:30:56.789Z",
  "status": "pending",
  "paymentMethod": null,
  "paymentProof": null
}
```

### Statuts possibles
- `pending` : En attente de paiement
- `paid` : Paiement confirmé
- `cancelled` : Annulé
- `completed` : Formation terminée

## 🔧 Configuration

### Variables d'environnement
Créez un fichier `.env` à la racine du projet :

```env
PORT=3000
NODE_ENV=development
```

### Configuration de production
Modifiez `production-config.js` selon vos besoins :
- URLs des APIs
- Configuration des cryptomonnaies
- Paramètres de sécurité

## 🧪 Test

### Test de l'API
```bash
# Test de base
curl http://localhost:3000/api/test

# Test de confirmation d'offre
curl -X POST http://localhost:3000/api/confirm-offer \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "telegram": "+261341234567",
    "offerName": "PREMIUM - La Totale",
    "offerPrice": 990000
  }'
```

## 📝 Logs

Le serveur génère des logs détaillés :
- ✅ Succès des opérations
- ❌ Erreurs et exceptions
- 📧 Notifications d'email
- 💰 Confirmations de paiement

## 🚨 Sécurité

### Mesures implémentées
- Validation des données d'entrée
- Gestion des erreurs CORS
- Validation des formats (email, télégram)
- Protection contre les injections

### Recommandations de production
- Utiliser HTTPS
- Implémenter l'authentification
- Ajouter un rate limiting
- Utiliser une base de données sécurisée

## 🔮 Développement futur

### Fonctionnalités prévues
- [ ] Base de données MongoDB/PostgreSQL
- [ ] Authentification JWT
- [ ] Intégration Telegram Bot
- [ ] Système de notifications push
- [ ] Dashboard administrateur
- [ ] Système de paiement automatisé

## 📞 Support

Pour toute question ou problème :
- **Telegram** : @HardX22
- **Facebook** : haillx666
- **Email** : cedricrsf@gmail.com

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.

---

**FXEMPEROR & RUGA** - Maîtrisez l'Art du Trading ! 🚀📈 