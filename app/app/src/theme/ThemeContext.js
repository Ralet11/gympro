import React, { createContext, useContext, useMemo, useState } from 'react';
import { accentPresets, baseSpacing, baseTypography, shape } from './tokens';

const ThemeContext = createContext();

const createTheme = (accentColor) => ({
  colors: {
    background: '#0B0B0F',
    surface: '#13131A',
    elevated: '#1B1B24',
    border: '#1F1F2B',
    textPrimary: '#ECECEC',
    textSecondary: '#A6A6B0',
    textMuted: '#6F6F7C',
    accent: accentColor,
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    overlay: 'rgba(11,11,15,0.72)',
    cardShadow: 'rgba(3, 3, 7, 0.4)',
  },
  spacing: (factor = 1) => baseSpacing * factor,
  shape,
  typography: baseTypography,
  effects: {
    card: {
      borderRadius: shape.radiusXl,
      padding: shape.paddingLg,
      backgroundColor: '#13131A',
      borderColor: 'rgba(255,255,255,0.02)',
      borderWidth: 1,
      shadowColor: 'rgba(0,0,0,0.8)',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.25,
      shadowRadius: 24,
      elevation: 12,
    },
    chip: {
      paddingHorizontal: baseSpacing * 1.5,
      paddingVertical: baseSpacing * 0.75,
      borderRadius: shape.radiusLg,
    },
    blur: 28,
    transition: 200,
  },
});

export const ThemeProvider = ({ children, initialAccent = 'yellow' }) => {
  const [accent, setAccent] = useState(initialAccent);

  const theme = useMemo(() => {
    const resolvedAccent = accentPresets[accent] ?? accent;
    return createTheme(resolvedAccent);
  }, [accent]);

  const value = useMemo(
    () => ({ theme, accent, setAccent }),
    [theme, accent]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
