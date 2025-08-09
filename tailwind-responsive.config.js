// ===== TAILWIND CSS RESPONSIVE CONFIGURATION =====
// Configuration optimisée pour téléphone, tablette et ordinateur

module.exports = {
  content: [
    "./*.html",
    "./*.js",
    "./*.css"
  ],
  theme: {
    extend: {
      // ===== BREAKPOINTS RESPONSIVE =====
      screens: {
        'xs': '320px',      // Très petits mobiles
        'sm': '640px',      // Petits mobiles
        'md': '768px',      // Tablettes
        'lg': '1024px',     // Petits écrans
        'xl': '1280px',     // Écrans moyens
        '2xl': '1536px',    // Grands écrans
        '3xl': '1920px',    // Très grands écrans
        
        // Breakpoints personnalisés
        'mobile': '320px',
        'tablet': '768px',
        'desktop': '1024px',
        'wide': '1280px',
        
        // Breakpoints pour l'orientation
        'landscape': {'raw': '(orientation: landscape)'},
        'portrait': {'raw': '(orientation: portrait)'},
        
        // Breakpoints pour la densité de pixels
        'retina': {'raw': '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)'},
        
        // Breakpoints pour les préférences utilisateur
        'motion-reduce': {'raw': '(prefers-reduced-motion: reduce)'},
        'dark': {'raw': '(prefers-color-scheme: dark)'},
        'light': {'raw': '(prefers-color-scheme: light)'}
      },
      
      // ===== COULEURS RESPONSIVE =====
      colors: {
        primary: {
          50: '#FFFBF0',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F'
        },
        accent: {
          50: '#FEF7EE',
          100: '#FDEBD0',
          200: '#FBD9A3',
          300: '#F8C276',
          400: '#F5AB49',
          500: '#D4AF37',  // Couleur principale FXEMPEROR
          600: '#B8941F',
          700: '#9C7A1A',
          800: '#806015',
          900: '#644610'
        },
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B'
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F'
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D'
        }
      },
      
      // ===== TYPOGRAPHIE RESPONSIVE =====
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        
        // Tailles responsive personnalisées
        'responsive-xs': ['clamp(0.75rem, 2vw, 0.875rem)', { lineHeight: '1.25rem' }],
        'responsive-sm': ['clamp(0.875rem, 2.5vw, 1rem)', { lineHeight: '1.5rem' }],
        'responsive-base': ['clamp(1rem, 3vw, 1.125rem)', { lineHeight: '1.75rem' }],
        'responsive-lg': ['clamp(1.125rem, 3.5vw, 1.25rem)', { lineHeight: '1.75rem' }],
        'responsive-xl': ['clamp(1.25rem, 4vw, 1.5rem)', { lineHeight: '2rem' }],
        'responsive-2xl': ['clamp(1.5rem, 5vw, 2rem)', { lineHeight: '2.25rem' }],
        'responsive-3xl': ['clamp(1.875rem, 6vw, 2.5rem)', { lineHeight: '2.5rem' }],
        'responsive-4xl': ['clamp(2.25rem, 7vw, 3rem)', { lineHeight: '1.1' }],
        'responsive-5xl': ['clamp(3rem, 8vw, 4rem)', { lineHeight: '1.1' }],
        'responsive-6xl': ['clamp(3.75rem, 10vw, 5rem)', { lineHeight: '1.1' }]
      },
      
      // ===== ESPACEMENT RESPONSIVE =====
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        
        // Espacement responsive
        'responsive-xs': 'clamp(0.5rem, 2vw, 0.75rem)',
        'responsive-sm': 'clamp(0.75rem, 3vw, 1rem)',
        'responsive-md': 'clamp(1rem, 4vw, 1.5rem)',
        'responsive-lg': 'clamp(1.5rem, 5vw, 2rem)',
        'responsive-xl': 'clamp(2rem, 6vw, 3rem)',
        'responsive-2xl': 'clamp(3rem, 8vw, 4rem)',
        'responsive-3xl': 'clamp(4rem, 10vw, 6rem)'
      },
      
      // ===== BORDER RADIUS RESPONSIVE =====
      borderRadius: {
        'xs': '0.125rem',
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        
        // Rayons responsive
        'responsive-sm': 'clamp(0.25rem, 1vw, 0.5rem)',
        'responsive-md': 'clamp(0.375rem, 1.5vw, 0.75rem)',
        'responsive-lg': 'clamp(0.5rem, 2vw, 1rem)',
        'responsive-xl': 'clamp(0.75rem, 3vw, 1.5rem)',
        'responsive-2xl': 'clamp(1rem, 4vw, 2rem)'
      },
      
      // ===== SHADOWS RESPONSIVE =====
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        
        // Ombres responsive
        'responsive-sm': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'responsive-md': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'responsive-lg': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'responsive-xl': '0 12px 32px rgba(0, 0, 0, 0.18)',
        'responsive-2xl': '0 16px 48px rgba(0, 0, 0, 0.2)',
        
        // Ombres spéciales FXEMPEROR
        'gold': '0 0 20px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 0 40px rgba(212, 175, 55, 0.4)',
        'gold-xl': '0 0 60px rgba(212, 175, 55, 0.5)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.12)'
      },
      
      // ===== ANIMATIONS RESPONSIVE =====
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'slide-left': 'slideLeft 0.4s ease-out',
        'slide-right': 'slideRight 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        
        // Animations responsive
        'responsive-fade': 'responsiveFade 0.8s ease-out',
        'responsive-slide': 'responsiveSlide 0.6s ease-out',
        'responsive-scale': 'responsiveScale 0.5s ease-out'
      },
      
      // ===== TRANSITIONS RESPONSIVE =====
      transitionDuration: {
        '0': '0ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
        '900': '900ms',
        '1000': '1000ms',
        
        // Durées responsive
        'responsive-fast': 'var(--animation-duration, 0.2s)',
        'responsive-normal': 'var(--animation-duration, 0.3s)',
        'responsive-slow': 'var(--animation-duration, 0.5s)'
      },
      
      // ===== Z-INDEX RESPONSIVE =====
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        
        // Z-index responsive
        'modal': '1000',
        'overlay': '999',
        'dropdown': '50',
        'sticky': '40',
        'header': '30',
        'footer': '20'
      },
      
      // ===== GRID RESPONSIVE =====
      gridTemplateColumns: {
        'responsive-1': 'repeat(1, minmax(0, 1fr))',
        'responsive-2': 'repeat(auto-fit, minmax(280px, 1fr))',
        'responsive-3': 'repeat(auto-fit, minmax(250px, 1fr))',
        'responsive-4': 'repeat(auto-fit, minmax(200px, 1fr))',
        'responsive-5': 'repeat(auto-fit, minmax(180px, 1fr))',
        'responsive-6': 'repeat(auto-fit, minmax(160px, 1fr))',
        
        // Grilles spécifiques par breakpoint
        'mobile-1': 'repeat(1, minmax(0, 1fr))',
        'mobile-2': 'repeat(2, minmax(0, 1fr))',
        'tablet-2': 'repeat(2, minmax(0, 1fr))',
        'tablet-3': 'repeat(3, minmax(0, 1fr))',
        'desktop-3': 'repeat(3, minmax(0, 1fr))',
        'desktop-4': 'repeat(4, minmax(0, 1fr))',
        'wide-4': 'repeat(4, minmax(0, 1fr))',
        'wide-5': 'repeat(5, minmax(0, 1fr))'
      },
      
      // ===== FLEXBOX RESPONSIVE =====
      flex: {
        'responsive-1': '1 1 100%',
        'responsive-2': '1 1 calc(50% - 1rem)',
        'responsive-3': '1 1 calc(33.333% - 1.33rem)',
        'responsive-4': '1 1 calc(25% - 1.5rem)',
        'responsive-5': '1 1 calc(20% - 1.6rem)',
        'responsive-6': '1 1 calc(16.666% - 1.67rem)'
      },
      
      // ===== ASPECT RATIO RESPONSIVE =====
      aspectRatio: {
        'mobile': '9/16',
        'tablet': '4/3',
        'desktop': '16/9',
        'wide': '21/9',
        'square': '1/1',
        'video': '16/9',
        'photo': '4/3',
        'banner': '21/9'
      }
    }
  },
  
  // ===== PLUGINS RESPONSIVE =====
  plugins: [
    // Plugin pour les utilitaires responsive
    function({ addUtilities, theme }) {
      const responsiveUtilities = {
        // Utilitaires de texte responsive
        '.text-responsive-xs': {
          fontSize: theme('fontSize.responsive-xs')[0],
          lineHeight: theme('fontSize.responsive-xs')[1].lineHeight
        },
        '.text-responsive-sm': {
          fontSize: theme('fontSize.responsive-sm')[0],
          lineHeight: theme('fontSize.responsive-sm')[1].lineHeight
        },
        '.text-responsive-base': {
          fontSize: theme('fontSize.responsive-base')[0],
          lineHeight: theme('fontSize.responsive-base')[1].lineHeight
        },
        '.text-responsive-lg': {
          fontSize: theme('fontSize.responsive-lg')[0],
          lineHeight: theme('fontSize.responsive-lg')[1].lineHeight
        },
        '.text-responsive-xl': {
          fontSize: theme('fontSize.responsive-xl')[0],
          lineHeight: theme('fontSize.responsive-xl')[1].lineHeight
        },
        '.text-responsive-2xl': {
          fontSize: theme('fontSize.responsive-2xl')[0],
          lineHeight: theme('fontSize.responsive-2xl')[1].lineHeight
        },
        '.text-responsive-3xl': {
          fontSize: theme('fontSize.responsive-3xl')[0],
          lineHeight: theme('fontSize.responsive-3xl')[1].lineHeight
        },
        '.text-responsive-4xl': {
          fontSize: theme('fontSize.responsive-4xl')[0],
          lineHeight: theme('fontSize.responsive-4xl')[1].lineHeight
        },
        '.text-responsive-5xl': {
          fontSize: theme('fontSize.responsive-5xl')[0],
          lineHeight: theme('fontSize.responsive-5xl')[1].lineHeight
        },
        '.text-responsive-6xl': {
          fontSize: theme('fontSize.responsive-6xl')[0],
          lineHeight: theme('fontSize.responsive-6xl')[1].lineHeight
        },
        
        // Utilitaires d'espacement responsive
        '.p-responsive-xs': { padding: theme('spacing.responsive-xs') },
        '.p-responsive-sm': { padding: theme('spacing.responsive-sm') },
        '.p-responsive-md': { padding: theme('spacing.responsive-md') },
        '.p-responsive-lg': { padding: theme('spacing.responsive-lg') },
        '.p-responsive-xl': { padding: theme('spacing.responsive-xl') },
        '.p-responsive-2xl': { padding: theme('spacing.responsive-2xl') },
        '.p-responsive-3xl': { padding: theme('spacing.responsive-3xl') },
        
        '.m-responsive-xs': { margin: theme('spacing.responsive-xs') },
        '.m-responsive-sm': { margin: theme('spacing.responsive-sm') },
        '.m-responsive-md': { margin: theme('spacing.responsive-md') },
        '.m-responsive-lg': { margin: theme('spacing.responsive-lg') },
        '.m-responsive-xl': { margin: theme('spacing.responsive-xl') },
        '.m-responsive-2xl': { margin: theme('spacing.responsive-2xl') },
        '.m-responsive-3xl': { margin: theme('spacing.responsive-3xl') },
        
        // Utilitaires de border radius responsive
        '.rounded-responsive-sm': { borderRadius: theme('borderRadius.responsive-sm') },
        '.rounded-responsive-md': { borderRadius: theme('borderRadius.responsive-md') },
        '.rounded-responsive-lg': { borderRadius: theme('borderRadius.responsive-lg') },
        '.rounded-responsive-xl': { borderRadius: theme('borderRadius.responsive-xl') },
        '.rounded-responsive-2xl': { borderRadius: theme('borderRadius.responsive-2xl') },
        
        // Utilitaires d'ombres responsive
        '.shadow-responsive-sm': { boxShadow: theme('boxShadow.responsive-sm') },
        '.shadow-responsive-md': { boxShadow: theme('boxShadow.responsive-md') },
        '.shadow-responsive-lg': { boxShadow: theme('boxShadow.responsive-lg') },
        '.shadow-responsive-xl': { boxShadow: theme('boxShadow.responsive-xl') },
        '.shadow-responsive-2xl': { boxShadow: theme('boxShadow.responsive-2xl') },
        
        // Utilitaires d'animations responsive
        '.animate-responsive-fade': { animation: 'responsiveFade 0.8s ease-out' },
        '.animate-responsive-slide': { animation: 'responsiveSlide 0.6s ease-out' },
        '.animate-responsive-scale': { animation: 'responsiveScale 0.5s ease-out' },
        
        // Utilitaires de transitions responsive
        '.transition-responsive-fast': { transitionDuration: theme('transitionDuration.responsive-fast') },
        '.transition-responsive-normal': { transitionDuration: theme('transitionDuration.responsive-normal') },
        '.transition-responsive-slow': { transitionDuration: theme('transitionDuration.responsive-slow') }
      };
      
      addUtilities(responsiveUtilities);
    },
    
    // Plugin pour les composants responsive
    function({ addComponents, theme }) {
      const responsiveComponents = {
        // Composant de navigation responsive
        '.nav-responsive': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: theme('spacing.responsive-md'),
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          transition: 'all 0.3s ease',
          
          '@screen md': {
            padding: theme('spacing.responsive-lg')
          },
          
          '@screen lg': {
            padding: theme('spacing.responsive-xl')
          }
        },
        
        // Composant de carte responsive
        '.card-responsive': {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: theme('borderRadius.responsive-lg'),
          padding: theme('spacing.responsive-md'),
          boxShadow: theme('boxShadow.responsive-md'),
          transition: 'all 0.3s ease',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme('boxShadow.responsive-lg'),
            borderColor: 'rgba(212, 175, 55, 0.4)'
          },
          
          '@screen md': {
            padding: theme('spacing.responsive-lg')
          },
          
          '@screen lg': {
            padding: theme('spacing.responsive-xl')
          }
        },
        
        // Composant de bouton responsive
        '.btn-responsive': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${theme('spacing.responsive-sm')} ${theme('spacing.responsive-md')}`,
          borderRadius: theme('borderRadius.responsive-md'),
          fontWeight: '600',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          border: 'none',
          cursor: 'pointer',
          fontSize: theme('fontSize.responsive-base')[0],
          minHeight: '44px',
          
          '@screen md': {
            padding: `${theme('spacing.responsive-md')} ${theme('spacing.responsive-lg')}`,
            fontSize: theme('fontSize.responsive-lg')[0]
          },
          
          '@screen lg': {
            padding: `${theme('spacing.responsive-lg')} ${theme('spacing.responsive-xl')}`,
            fontSize: theme('fontSize.responsive-xl')[0]
          }
        },
        
        '.btn-primary-responsive': {
          backgroundColor: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
          color: 'white',
          boxShadow: theme('boxShadow.gold'),
          
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme('boxShadow.gold-lg')
          }
        },
        
        '.btn-secondary-responsive': {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          color: theme('colors.gray.800'),
          border: '1px solid rgba(212, 175, 55, 0.3)',
          
          '&:hover': {
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            borderColor: '#D4AF37'
          }
        }
      };
      
      addComponents(responsiveComponents);
    }
  ],
  
  // ===== CONFIGURATION RESPONSIVE =====
  corePlugins: {
    // Désactiver certains plugins par défaut pour les remplacer par des versions responsive
    container: false,
    preflight: true,
    base: true,
    utilities: true,
    components: true
  }
}; 