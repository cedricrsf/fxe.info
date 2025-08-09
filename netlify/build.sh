#!/bin/bash

# Script de build pour Netlify
echo "🚀 Démarrage du build Netlify..."

# Installer les dépendances des fonctions Netlify
echo "📦 Installation des dépendances des fonctions..."
cd netlify/functions
npm install --production
cd ../..

echo "✅ Build terminé avec succès!" 