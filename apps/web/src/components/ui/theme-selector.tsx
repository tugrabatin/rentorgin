/**
 * Theme Selector Component
 * Select between different theme options
 */

'use client';

import { useTheme, ThemeName } from '../../contexts/theme-context';
import { useLanguage } from '../../contexts/language-context';
import { Palette, Check } from 'lucide-react';
import { useState } from 'react';

export function ThemeSelector() {
  const { theme, setTheme, availableThemes } = useTheme();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-glass !px-4 !py-2 flex items-center gap-2"
        title={t('theme.title')}
      >
        <Palette className="w-4 h-4" />
        <span className="text-sm font-medium capitalize hidden md:inline">
          {t(`theme.${theme}`)}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 glass-strong rounded-2xl border border-white/10 shadow-glass z-50 p-2 animate-fade-in">
            <div className="text-xs font-semibold text-white/50 px-3 py-2 uppercase tracking-wider">
              {t('theme.title')}
            </div>
            {availableThemes.map((themeOption) => (
              <button
                key={themeOption.name}
                onClick={() => {
                  setTheme(themeOption.name);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-smooth ${
                  theme === themeOption.name
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${themeOption.colors.primary}, ${themeOption.colors.secondary})`,
                    }}
                  />
                  <span className="text-sm font-medium capitalize">
                    {t(`theme.${themeOption.name}`)}
                  </span>
                </div>
                {theme === themeOption.name && (
                  <Check className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

