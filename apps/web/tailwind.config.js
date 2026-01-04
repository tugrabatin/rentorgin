/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Glassmorphism Premium Color Palette
        glass: {
          bg: 'rgba(255, 255, 255, 0.05)',
          bgLight: 'rgba(255, 255, 255, 0.1)',
          bgMedium: 'rgba(255, 255, 255, 0.15)',
          bgStrong: 'rgba(255, 255, 255, 0.2)',
          border: 'rgba(255, 255, 255, 0.1)',
          borderLight: 'rgba(255, 255, 255, 0.05)',
          borderStrong: 'rgba(255, 255, 255, 0.2)',
          text: 'rgba(255, 255, 255, 0.9)',
          textMuted: 'rgba(255, 255, 255, 0.6)',
          textSubtle: 'rgba(255, 255, 255, 0.4)',
        },
        // Accent colors for glassmorphism
        accent: {
          cyan: '#06b6d4',
          cyanLight: '#67e8f9',
          cyanDark: '#0891b2',
          teal: '#14b8a6',
          tealLight: '#5eead4',
          tealDark: '#0f766e',
          petroleum: '#0d9488',
          petroleumLight: '#2dd4bf',
        },
        // Background gradients
        bgDark: {
          from: '#0a1929',
          via: '#0f2942',
          to: '#082f49',
        },
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        secondary: {
          500: '#8b5cf6',
          600: '#7c3aed',
        },
      },
      backgroundImage: {
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'gradient-glass-hover': 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a1929 0%, #0f2942 50%, #082f49 100%)',
        'gradient-accent': 'linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%)',
        'gradient-accent-glow': 'radial-gradient(circle at center, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
      },
      backdropBlur: {
        xs: '2px',
        glass: '16px',
        'glass-strong': '24px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-hover': '0 12px 40px 0 rgba(0, 0, 0, 0.45)',
        'glass-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.5)',
        'glow-teal': '0 0 20px rgba(20, 184, 166, 0.5)',
        'glow-accent': '0 0 30px rgba(6, 182, 212, 0.4), 0 0 60px rgba(20, 184, 166, 0.2)',
      },
      borderRadius: {
        'glass': '12px',
        'glass-sm': '8px',
        'glass-lg': '16px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};



















