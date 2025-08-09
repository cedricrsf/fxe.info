// Configuration de production pour FXEMPEROR
window.FXECONFIG = {
    // Configuration de l'API
    API_BASE_URL: 'http://localhost:3000',
    API_ENDPOINTS: {
        PAYMENT: '/api/payment',
        EMAIL: '/api/send-confirmation-email',
        TELEGRAM: '/api/add-user-to-telegram'
    },
    
    // Configuration des cryptomonnaies
    CRYPTO_CONFIG: {
        BTC: {
            network: 'Bitcoin',
            decimals: 8,
            minAmount: 0.00001
        },
        USDT: {
            network: 'Tron (TRC20)',
            decimals: 2,
            minAmount: 1.00
        },
        USDC: {
            network: 'Ethereum (ERC20)',
            decimals: 2,
            minAmount: 1.00
        }
    },
    
    // Configuration des taux de change
    EXCHANGE_RATES: {
        USD_TO_MGA: 4404, // Taux approximatif
        UPDATE_INTERVAL: 300000 // 5 minutes
    },
    
    // Configuration des délais
    TIMEOUTS: {
        PAYMENT_VERIFICATION: 300000, // 5 minutes
        MODAL_AUTO_CLOSE: 10000 // 10 secondes
    },
    
    // Configuration des messages
    MESSAGES: {
        SUCCESS: {
            PAYMENT_CONFIRMED: 'Paiement confirmé avec succès!',
            TELEGRAM_ADDED: 'Ajouté aux groupes Telegram avec succès!'
        },
        ERROR: {
            PAYMENT_FAILED: 'Échec du paiement. Veuillez réessayer.',
            NETWORK_ERROR: 'Erreur de réseau. Vérifiez votre connexion.',
            TIMEOUT: 'Délai d\'attente dépassé. Veuillez réessayer.'
        },
        INFO: {
            PROCESSING: 'Traitement en cours...',
            VERIFYING: 'Vérification du paiement...'
        }
    },
    
    // Configuration des réseaux sociaux
    SOCIAL_LINKS: {
        FACEBOOK: 'https://web.facebook.com/haillx666',
        TELEGRAM: 'https://t.me/fxeemperor',
        WHATSAPP: 'https://wa.me/261341605006'
    },
    
    // Configuration des offres
    OFFERS: {
        BASIC: {
            name: 'Formation FXEMPEROR Basic',
            price: 50000,
            currency: 'MGA',
            features: ['Accès au groupe principal', 'Formation de base', 'Support communautaire']
        },
        PREMIUM: {
            name: 'Formation FXEMPEROR Premium',
            price: 100000,
            currency: 'MGA',
            features: ['Accès aux groupes privés', 'Formation complète', 'Support prioritaire', 'Signaux en temps réel']
        },
        VIP: {
            name: 'Formation FXEMPEROR VIP',
            price: 200000,
            currency: 'MGA',
            features: ['Accès VIP exclusif', 'Formation personnalisée', 'Support 24/7', 'Signaux premium', 'Analyse personnalisée']
        }
    },
    
    // Configuration de sécurité
    SECURITY: {
        MIN_PAYMENT_AMOUNT: 1000, // MGA
        MAX_PAYMENT_AMOUNT: 1000000, // MGA
        PAYMENT_TIMEOUT: 300, // secondes
        VERIFICATION_ATTEMPTS: 3
    },
    
    // Configuration des notifications
    NOTIFICATIONS: {
        EMAIL: {
            enabled: true,
            template: 'default',
            sender: 'noreply@fxeemperor.com'
        },
        TELEGRAM: {
            enabled: true,
            botToken: 'YOUR_BOT_TOKEN',
            chatId: 'YOUR_CHAT_ID'
        },
        SMS: {
            enabled: false,
            provider: 'mvola'
        }
    },
    
    // Configuration de l'environnement
    ENVIRONMENT: {
        isProduction: false,
        isDevelopment: true,
        debugMode: true,
        logLevel: 'info'
    },
    
    // Méthodes utilitaires
    utils: {
        // Formater un montant
        formatAmount: function(amount, currency = 'MGA') {
            if (currency === 'MGA') {
                return new Intl.NumberFormat('fr-MG').format(amount);
            } else if (currency === 'USD') {
                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
            }
            return amount.toString();
        },
        
        // Convertir un montant
        convertAmount: function(amount, fromCurrency, toCurrency) {
            const rates = this.EXCHANGE_RATES;
            if (fromCurrency === 'MGA' && toCurrency === 'USD') {
                return amount / rates.USD_TO_MGA;
            } else if (fromCurrency === 'USD' && toCurrency === 'MGA') {
                return amount * rates.USD_TO_MGA;
            }
            return amount;
        },
        
        // Valider un email
        validateEmail: function(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        
        // Valider un numéro de téléphone
        validatePhone: function(phone) {
            const phoneRegex = /^(\+261|0)?[3-4][0-9]{8}$/;
            return phoneRegex.test(phone);
        },
        
        // Générer un ID unique
        generateId: function() {
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        },
        
        // Copier du texte dans le presse-papiers
        copyToClipboard: function(text) {
            if (navigator.clipboard && window.isSecureContext) {
                return navigator.clipboard.writeText(text);
            } else {
                // Fallback pour les navigateurs plus anciens
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    textArea.remove();
                    return Promise.resolve();
                } catch (err) {
                    textArea.remove();
                    return Promise.reject(err);
                }
            }
        },
        
        // Afficher une notification
        showNotification: function(message, type = 'info', duration = 5000) {
            const notification = document.createElement('div');
            notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${this.getNotificationClasses(type)}`;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, duration);
        },
        
        // Obtenir les classes CSS pour les notifications
        getNotificationClasses: function(type) {
            const classes = {
                success: 'bg-green-500 text-white',
                error: 'bg-red-500 text-white',
                warning: 'bg-yellow-500 text-white',
                info: 'bg-blue-500 text-white'
            };
            return classes[type] || classes.info;
        },
        
        // Logger les événements
        log: function(message, level = 'info') {
            if (this.ENVIRONMENT.debugMode) {
                const timestamp = new Date().toISOString();
                const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
                
                switch (level) {
                    case 'error':
                        console.error(logMessage);
                        break;
                    case 'warn':
                        console.warn(logMessage);
                        break;
                    case 'info':
                        console.info(logMessage);
                        break;
                    default:
                        console.log(logMessage);
                }
            }
        }
    }
};

// Initialisation de la configuration
(function() {
    'use strict';
    
    // Vérifier que la configuration est chargée
    if (typeof window.FXECONFIG === 'undefined') {
        console.error('❌ Configuration FXEMPEROR non chargée');
        return;
    }
    
    // Logger le chargement de la configuration
    window.FXECONFIG.utils.log('Configuration FXEMPEROR chargée avec succès', 'info');
    
    // Exposer la configuration globalement
    window.FXE = window.FXECONFIG;
    
    // Événement personnalisé pour indiquer que la configuration est prête
    window.dispatchEvent(new CustomEvent('fxeConfigReady', {
        detail: { config: window.FXECONFIG }
    }));
    
    console.log('✅ Configuration FXEMPEROR initialisée');
})(); 