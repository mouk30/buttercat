import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'bright' | 'soft-dark';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  isSoftDark: boolean;
}

const THEME_STORAGE_KEY = 'buttercat_theme_mode';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    // 1. Check localStorage first
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'soft-dark' || saved === 'bright') {
      return saved;
    }
    // 2. Check system preference (optional default is bright)
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // If late night (e.g., after 8 PM or before 6 AM) or user prefers dark
      const hour = new Date().getHours();
      if (hour >= 20 || hour < 7) {
        return 'soft-dark';
      }
    }
    return 'bright';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'bright' ? 'soft-dark' : 'bright');
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'soft-dark') {
      root.classList.add('dark', 'soft-dark');
      root.classList.remove('bright');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark', 'soft-dark');
      root.classList.add('bright');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  const isSoftDark = theme === 'soft-dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isSoftDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
