import { createContext, ReactNode, useContext, useState } from 'react';

export type ThemeColors = {
  background: string;
  card: string;
  border: string;
  text: string;
  subtleText: string;
  primary: string;
  primaryText: string;
  danger: string;
  tabBarInactive: string;
};

const lightColors: ThemeColors = {
  background: '#f9fafb',
  card: '#ffffff',
  border: '#e5e7eb',
  text: '#111827',
  subtleText: '#6b7280',
  primary: '#2563eb',
  primaryText: '#ffffff',
  danger: '#dc2626',
  tabBarInactive: '#9ca3af',
};

const darkColors: ThemeColors = {
  background: '#0f172a',
  card: '#1e293b',
  border: '#334155',
  text: '#f1f5f9',
  subtleText: '#94a3b8',
  primary: '#3b82f6',
  primaryText: '#ffffff',
  danger: '#f87171',
  tabBarInactive: '#64748b',
};

type ThemeContextValue = {
  isDark: boolean;
  colors: ThemeColors;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const value: ThemeContextValue = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    toggleDarkMode: () => setIsDark((prev) => !prev),
    setDarkMode: setIsDark,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }
  return ctx;
}
