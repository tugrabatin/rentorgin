/**
 * Theme Context
 * Multiple theme support (Dark, Light, Ocean, Forest)
 * 
 * Tema Bağlamı
 * Çoklu tema desteği (Koyu, Açık, Okyanus, Orman)
 */

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeName = 'dark' | 'light' | 'ocean' | 'forest';

interface ThemeConfig {
  name: ThemeName;
  label: string;
  colors: {
    bgGradientFrom: string;
    bgGradientVia: string;
    bgGradientTo: string;
    primary: string;
    primaryGlow: string;
    secondary: string;
    accent: string;
  };
}

const themes: Record<ThemeName, ThemeConfig> = {
  dark: {
    name: 'dark',
    label: 'Dark',
    colors: {
      bgGradientFrom: '#0a0e27',
      bgGradientVia: '#1a0b2e',
      bgGradientTo: '#0a0e27',
      primary: '#00d4ff',
      primaryGlow: 'rgba(0, 212, 255, 0.5)',
      secondary: '#00e5cc',
      accent: '#ff006e',
    },
  },
  light: {
    name: 'light',
    label: 'Light',
    colors: {
      bgGradientFrom: '#f0f4f8',
      bgGradientVia: '#e8eef5',
      bgGradientTo: '#f0f4f8',
      primary: '#0284c7',
      primaryGlow: 'rgba(2, 132, 199, 0.5)',
      secondary: '#0891b2',
      accent: '#dc2626',
    },
  },
  ocean: {
    name: 'ocean',
    label: 'Ocean',
    colors: {
      bgGradientFrom: '#0a1929',
      bgGradientVia: '#0c2d48',
      bgGradientTo: '#0a1929',
      primary: '#00b4d8',
      primaryGlow: 'rgba(0, 180, 216, 0.5)',
      secondary: '#48cae4',
      accent: '#03045e',
    },
  },
  forest: {
    name: 'forest',
    label: 'Forest',
    colors: {
      bgGradientFrom: '#0d1f1b',
      bgGradientVia: '#1a3d2e',
      bgGradientTo: '#0d1f1b',
      primary: '#34d399',
      primaryGlow: 'rgba(52, 211, 153, 0.5)',
      secondary: '#10b981',
      accent: '#14532d',
    },
  },
};

interface ThemeContextType {
  theme: ThemeName;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeName) => void;
  availableThemes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>('dark');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeName;
    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  // Apply theme to CSS variables
  const applyTheme = (themeName: ThemeName) => {
    const config = themes[themeName];
    const root = document.documentElement;

    root.style.setProperty('--color-bg-gradient-start', config.colors.bgGradientFrom);
    root.style.setProperty('--color-bg-gradient-via', config.colors.bgGradientVia);
    root.style.setProperty('--color-bg-gradient-end', config.colors.bgGradientTo);
    root.style.setProperty('--color-primary', config.colors.primary);
    root.style.setProperty('--color-primary-glow', config.colors.primaryGlow);
    root.style.setProperty('--color-secondary', config.colors.secondary);
    root.style.setProperty('--color-accent', config.colors.accent);

    // Add theme class to body
    root.setAttribute('data-theme', themeName);
    
    // Handle light theme specific adjustments
    if (themeName === 'light') {
      root.classList.add('theme-light');
    } else {
      root.classList.remove('theme-light');
    }
  };

  // Set theme
  const setTheme = (themeName: ThemeName) => {
    setThemeState(themeName);
    localStorage.setItem('theme', themeName);
    applyTheme(themeName);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeConfig: themes[theme],
        setTheme,
        availableThemes: Object.values(themes),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}








