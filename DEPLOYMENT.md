# 🚀 Guide de Déploiement Netlify - FXEMPEROR & RUGA

## 📋 Prérequis

1. **Compte GitHub** : Votre code doit être sur GitHub
2. **Compte Netlify** : Créez un compte sur [netlify.com](https://netlify.com)
3. **Variables d'environnement** : Préparez vos clés d'API

## 🔧 Configuration

### 1. Variables d'environnement Netlify

Dans votre dashboard Netlify, allez dans **Site settings > Environment variables** et ajoutez :

```
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app_gmail
```

**⚠️ Important** : Pour Gmail, utilisez un "mot de passe d'application" et non votre mot de passe principal.

### 2. Configuration des fonctions

Les fonctions Netlify sont dans le dossier `netlify/functions/` et gèrent :
- Confirmation d'offre (`/api/confirm-offer`)
- Traitement de paiement (`/api/process-payment`)

## 🔄 Migration du serveur local vers Netlify

### Ancien serveur local (server.js)
- **Port** : 3000
- **URL locale** : `http://localhost:3000`
- **API de test** : `http://localhost:3000/api/test`

### Nouveau serveur Netlify
- **Port** : Automatique (80/443)
- **URL de production** : `https://votre-site.netlify.app`
- **API de test** : `https://votre-site.netlify.app/api/test`

### Changements dans le code
- Les routes `/api/*` sont maintenant gérées par Netlify Functions
- Le serveur Express (`server.js`) n'est plus nécessaire en production
- Les variables d'environnement sont configurées dans le dashboard Netlify

## 🚀 Déploiement

### Option 1 : Déploiement automatique via GitHub

1. **Connectez votre repo GitHub** dans Netlify
2. **Sélectionnez le repository** `fxe-tsotre`
3. **Configuration de build** :
   - Build command : `npm install --prefix netlify/functions`
   - Publish directory : `.`
4. **Cliquez sur "Deploy site"**

### Option 2 : Déploiement manuel

1. **Installez Netlify CLI** :
   ```bash
   npm install -g netlify-cli
   ```

2. **Connectez-vous** :
   ```bash
   netlify login
   ```

3. **Déployez** :
   ```bash
   netlify deploy --prod
   ```

## 📁 Structure du projet

```
fxe-tsotre/
├── netlify/
│   ├── functions/
│   │   ├── api.js          # API principale
│   │   └── package.json    # Dépendances des fonctions
├── netlify.toml            # Configuration Netlify
├── index.html              # Page d'accueil
├── formation.html          # Page de formation
├── paiement.html           # Page de paiement
└── responsive.css          # Styles responsifs
```

## 🔍 Vérification

Après le déploiement, vérifiez :

1. **Site principal** : `https://votre-site.netlify.app`
2. **API de test** : `https://votre-site.netlify.app/api/test`
3. **Routes API disponibles** :
   - `GET /api/test` - Test de l'API
   - `POST /api/confirm-offer` - Confirmation d'offre
   - `POST /api/process-payment` - Traitement de paiement
   - `GET /api/submission-status` - Statut d'une soumission
4. **Fonctionnalités** :
   - Formulaire de confirmation d'offre
   - Traitement des paiements
   - Envoi d'emails
   - Gestion des soumissions

## 🐛 Dépannage

### Erreur de build
- Vérifiez que `netlify/functions/package.json` existe
- Assurez-vous que les dépendances sont correctes

### Erreur d'API
- Vérifiez les variables d'environnement
- Consultez les logs dans Netlify Functions

### Problème d'email
- Vérifiez les identifiants Gmail
- Assurez-vous d'utiliser un mot de passe d'application

## 📞 Support

Pour toute question sur le déploiement, consultez :
- [Documentation Netlify](https://docs.netlify.com/)
- [Guide des fonctions Netlify](https://docs.netlify.com/functions/overview/)

---

**🎯 FXEMPEROR & RUGA** - Formation Trading de Qualité 