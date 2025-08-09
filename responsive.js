// ===== RESPONSIVE JAVASCRIPT SYSTEM =====
// Gestion responsive pour téléphone, tablette et ordinateur

class ResponsiveManager {
    constructor() {
        this.isMobile = window.innerWidth < 768;
        this.isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        this.isDesktop = window.innerWidth >= 1024;
        this.isLandscape = window.innerHeight < window.innerWidth;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupMobileNavigation();
        this.setupTouchOptimizations();
        this.setupResponsiveImages();
        this.setupScrollAnimations();
        this.setupPerformanceOptimizations();
    }

    setupEventListeners() {
        // Gestion du redimensionnement de la fenêtre
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Gestion de l'orientation
        window.addEventListener('orientationchange', this.handleOrientationChange.bind(this));
        
        // Gestion du scroll
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Gestion du touch
        if ('ontouchstart' in window) {
            this.setupTouchEvents();
        }
    }

    setupMobileNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const body = document.body;

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
            });

            // Fermer le menu en cliquant sur un lien
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.style.overflow = 'auto';
                });
            });

            // Fermer le menu en cliquant à l'extérieur
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.style.overflow = 'auto';
                }
            });
        }
    }

    setupTouchOptimizations() {
        if (this.isMobile || this.isTablet) {
            // Optimiser les interactions tactiles
            this.optimizeTouchTargets();
            this.setupSwipeGestures();
            this.setupTouchFeedback();
        }
    }

    optimizeTouchTargets() {
        // S'assurer que tous les éléments cliquables ont une taille minimale de 44px
        const touchTargets = document.querySelectorAll('button, a, input, select, textarea, [role="button"]');
        touchTargets.forEach(target => {
            const rect = target.getBoundingClientRect();
            if (rect.width < 44 || rect.height < 44) {
                target.style.minWidth = '44px';
                target.style.minHeight = '44px';
            }
        });
    }

    setupSwipeGestures() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            this.handleSwipe(startX, startY, endX, endY);
        });
    }

    handleSwipe(startX, startY, endX, endY) {
        const diffX = startX - endX;
        const diffY = startY - endY;
        const minSwipeDistance = 50;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
            // Swipe horizontal
            if (diffX > 0) {
                // Swipe gauche
                this.handleSwipeLeft();
            } else {
                // Swipe droite
                this.handleSwipeRight();
            }
        } else if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > minSwipeDistance) {
            // Swipe vertical
            if (diffY > 0) {
                // Swipe haut
                this.handleSwipeUp();
            } else {
                // Swipe bas
                this.handleSwipeDown();
            }
        }
    }

    handleSwipeLeft() {
        // Fermer le menu mobile si ouvert
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    handleSwipeRight() {
        // Ouvrir le menu mobile si fermé
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && !navMenu.classList.contains('active')) {
            navMenu.classList.add('active');
            hamburger.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    handleSwipeUp() {
        // Scroll vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    handleSwipeDown() {
        // Scroll vers le bas
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }

    setupTouchFeedback() {
        // Ajouter un feedback visuel pour les interactions tactiles
        const touchElements = document.querySelectorAll('.btn-responsive, .card-responsive, .payment-method');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.95)';
                element.style.transition = 'transform 0.1s ease';
            });

            element.addEventListener('touchend', () => {
                element.style.transform = 'scale(1)';
            });
        });
    }

    setupResponsiveImages() {
        // Optimiser les images selon la taille d'écran
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (this.isMobile) {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
            }
        });
    }

    setupScrollAnimations() {
        // Animations au scroll avec Intersection Observer
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            // Observer les éléments avec des animations
            const animatedElements = document.querySelectorAll('.fade-in-responsive, .slide-up-responsive');
            animatedElements.forEach(el => observer.observe(el));
        }
    }

    setupPerformanceOptimizations() {
        // Optimisations de performance pour mobile
        if (this.isMobile) {
            // Réduire les animations sur mobile
            document.documentElement.style.setProperty('--animation-duration', '0.3s');
            
            // Optimiser les images
            this.lazyLoadImages();
        }
    }

    lazyLoadImages() {
        // Chargement différé des images
        const images = document.querySelectorAll('img[data-src]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    handleResize() {
        // Mettre à jour les variables responsive
        this.isMobile = window.innerWidth < 768;
        this.isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        this.isDesktop = window.innerWidth >= 1024;
        this.isLandscape = window.innerHeight < window.innerWidth;

        // Adapter l'interface selon la nouvelle taille
        this.adaptInterface();
    }

    handleOrientationChange() {
        // Gérer le changement d'orientation
        setTimeout(() => {
            this.isLandscape = window.innerHeight < window.innerWidth;
            this.adaptInterface();
        }, 100);
    }

    handleScroll() {
        // Gérer le scroll avec throttling pour les performances
        if (!this.scrollTimeout) {
            this.scrollTimeout = setTimeout(() => {
                this.handleScrollThrottled();
                this.scrollTimeout = null;
            }, 16); // ~60fps
        }
    }

    handleScrollThrottled() {
        // Ajouter des classes CSS selon la position de scroll
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        
        if (header) {
            if (scrolled > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Parallax effect pour desktop
        if (this.isDesktop) {
            this.handleParallax(scrolled);
        }
    }

    handleParallax(scrolled) {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    adaptInterface() {
        // Adapter l'interface selon la taille d'écran
        if (this.isMobile) {
            this.adaptForMobile();
        } else if (this.isTablet) {
            this.adaptForTablet();
        } else {
            this.adaptForDesktop();
        }
    }

    adaptForMobile() {
        // Optimisations spécifiques au mobile
        document.body.classList.add('mobile-view');
        document.body.classList.remove('tablet-view', 'desktop-view');
        
        // Réduire les animations
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
        
        // Optimiser la navigation
        this.optimizeMobileNavigation();
    }

    adaptForTablet() {
        // Optimisations spécifiques à la tablette
        document.body.classList.add('tablet-view');
        document.body.classList.remove('mobile-view', 'desktop-view');
        
        // Animations modérées
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }

    adaptForDesktop() {
        // Optimisations spécifiques au desktop
        document.body.classList.add('desktop-view');
        document.body.classList.remove('mobile-view', 'tablet-view');
        
        // Animations complètes
        document.documentElement.style.setProperty('--animation-duration', '0.5s');
        
        // Activer les effets de hover
        this.enableHoverEffects();
    }

    optimizeMobileNavigation() {
        // Optimiser la navigation mobile
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.style.fontSize = this.isLandscape ? '1.2rem' : '1.5rem';
        }
    }

    enableHoverEffects() {
        // Activer les effets de hover sur desktop
        const hoverElements = document.querySelectorAll('.card-responsive, .btn-responsive');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-4px)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0)';
            });
        });
    }

    // Méthodes utilitaires
    getDeviceType() {
        return {
            isMobile: this.isMobile,
            isTablet: this.isTablet,
            isDesktop: this.isDesktop,
            isLandscape: this.isLandscape
        };
    }

    isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    getScreenSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            ratio: window.innerWidth / window.innerHeight
        };
    }
}

// ===== UTILITAIRES RESPONSIVE =====
class ResponsiveUtils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static addResponsiveClass(element, className, breakpoint) {
        const addClass = () => {
            if (window.innerWidth >= breakpoint) {
                element.classList.add(className);
            } else {
                element.classList.remove(className);
            }
        };
        
        addClass();
        window.addEventListener('resize', ResponsiveUtils.debounce(addClass, 250));
    }
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser le gestionnaire responsive
    window.responsiveManager = new ResponsiveManager();
    
    // Ajouter des classes CSS selon la taille d'écran
    const body = document.body;
    if (window.innerWidth < 768) {
        body.classList.add('mobile-view');
    } else if (window.innerWidth < 1024) {
        body.classList.add('tablet-view');
    } else {
        body.classList.add('desktop-view');
    }
    
    console.log('Responsive Manager initialisé:', window.responsiveManager.getDeviceType());
});

// ===== EXPORT POUR UTILISATION EXTERNE =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ResponsiveManager, ResponsiveUtils };
} 