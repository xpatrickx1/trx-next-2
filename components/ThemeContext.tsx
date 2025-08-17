// context/ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react';

type Theme = 'red' | 'green';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeType = process.env.NEXT_PUBLIC_APP_THEME;
  // @ts-ignore
  const [theme, setTheme] = useState<Theme>(themeType); // default: red, additional: green

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
