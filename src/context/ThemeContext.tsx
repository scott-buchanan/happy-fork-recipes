'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface ThemeProvider {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeProvider | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const getThemeFromLocalStorage = () => {
    if (typeof window === 'undefined') return 'light'; // default to light if not available
    const storedTheme = localStorage.getItem('theme');
    return storedTheme === 'dark' ? 'dark' : 'light'; // default to light if stored theme is invalid
  };

  const [theme, setTheme] = useState<string>(getThemeFromLocalStorage);

  // Apply theme on mount and when theme changes
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
