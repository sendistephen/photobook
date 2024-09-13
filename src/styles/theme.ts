import { BaseColors, Theme } from 'types/theme';

const sharedThemeColors = {
  primary: '#BB86FC',
  primaryVariant: '#3700B3',
  secondary: '#03DAC6',
  secondaryVariant: '#00BFA5',
  error: '#B00020',
  textPrimary: '#000000',
  textSecondary: '#5F6368',
  linkColor: '#6c757d',
  borderLight: '#d1d1d1',
  borderDark: '#111',
};

const baseColors: BaseColors = {
  common: {
    linkColor: '#6c757d',
    skeletonBase: {
      dark: '#121212',
      light: '#E4E4E7',
    },
    skeltonHighlight: {
      dark: '#333333',
      light: '#F4F4F5',
    },
  },
  dark: {
    ...sharedThemeColors, 
    background: '#121212',
    surface: '#333333',
    cardSurface: '#2C2C2C',
    onBackground: 'rgba(255, 255, 255, 0.87)',
    onSurface: 'rgba(255, 255, 255, 0.87)',
    textPrimary: 'rgba(255, 255, 255, 0.87)',
    textSecondary: 'rgba(255, 255, 255, 0.60)',
    skeletonBase: 'rgba(255, 255, 255, 0.13)',
    skeltonHighlight: 'rgba(255, 255, 255, 0.25)',
    hoverLinkBackground: '#444444',
    hoverLinkColor: '#ffffff',
    activeLinkBackground: '#555555',
    activeLinkColor: '#ffffff',
    focusLinkBackground: '#666666',
    focusLinkColor: '#ffffff',
  },
  light: {
    ...sharedThemeColors, // Merging shared colors
    background: '#FFFFFF',
    surface: '#FFFFFF',
    onBackground: '#000000',
    onSurface: '#000000',
    cardSurface: '#E4E4E7',
    skeletonBase: '#E4E4E7',
    skeltonHighlight: '#F4F4F5',
    hoverLinkBackground: '#f0f0f0',
    hoverLinkColor: '#000000',
    activeLinkBackground: '#e0e0e0',
    activeLinkColor: '#000000',
    focusLinkBackground: '#d0d0d0',
    focusLinkColor: '#000000',
  },
};

const createTheme = (mode: 'dark' | 'light'): Theme => ({
  colors: {
    ...baseColors[mode],
    linkColor: baseColors.common.linkColor,
    skeletonBase: baseColors.common.skeletonBase[mode],
    skeltonHighlight: baseColors.common.skeltonHighlight[mode],
  },
  fonts: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.75rem',
  },
  breakpoints: {
    xs: '480px',
    sm: '768px',
    md: '992px',
    lg: '1200px',
    xl: '1400px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
    '4xl': '3.5rem',
    '5xl': '4rem',
    '6xl': '4.5rem',
  },
});

export const theme = {
  dark: createTheme('dark'),
  light: createTheme('light'),
};
