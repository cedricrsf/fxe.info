# 🚀 FXEMPEROR & RUGA - Formation Trading

Site web de formation trading avec API backend déployé sur Netlify.

## 🌐 Site en ligne

- **URL de production** : [https://fxe.netlify.app](https://fxe.netlify.app)
- **API de test** : [https://fxe.netlify.app/api/test](https://fxe.netlify.app/api/test)

## 🚀 Déploiement rapide

### Prérequis
1. Compte GitHub
2. Compte Netlify
3. Variables d'environnement configurées

### Variables d'environnement Netlify
```
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app_gmail
```

### Déploiement automatique
1. Connectez ce repository à Netlify
2. Configurez les variables d'environnement
3. Déployez automatiquement à chaque push

## 📁 Structure du projet

```
├── netlify/
│   ├── functions/          # API backend (Netlify Functions)
│   │   ├── api.js         # Routes API principales
│   │   └── package.json   # Dépendances
│   └── build.sh           # Script de build
├── index.html              # Page d'accueil
├── formation.html          # Page de formation
├── paiement.html           # Page de paiement
├── responsive.css          # Styles responsifs
└── netlify.toml           # Configuration Netlify
```

## 🔧 API Endpoints

- `GET /api/test` - Test de l'API
- `POST /api/confirm-offer` - Confirmation d'offre
- `POST /api/process-payment` - Traitement de paiement
- `GET /api/submission-status` - Statut d'une soumission

## 🧪 Test de l'API

```bash
# Installer les dépendances
npm install

# Tester l'API (après déploiement)
node test-api.js
```

## 📚 Documentation

- [Guide de déploiement](DEPLOYMENT.md)
- [Guide responsive](RESPONSIVE-GUIDE.md)

## 🎯 Fonctionnalités

- ✅ Site responsive et moderne
- ✅ API backend avec Netlify Functions
- ✅ Gestion des formulaires
- ✅ Envoi d'emails automatiques
- ✅ Traitement des paiements
- ✅ Interface utilisateur intuitive

---

**🎯 FXEMPEROR & RUGA** - Formation Trading de Qualité 