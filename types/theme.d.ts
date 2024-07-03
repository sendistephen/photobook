import 'styled-components';

interface BaseColors {
  common: CommonColors;
  dark: ThemeColors;
  light: ThemeColors;
}

interface CommonColors {
  linkColor: string;
  skeletonBase: { dark: string; light: string };
  skeltonHighlight: { dark: string; light: string };
}

interface ThemeColors {
  background: string;
  surface: string;
  onBackground: string;
  cardSurface: string;
  onSurface: string;
  primary: string;
  primaryVariant: string;
  secondary: string;
  error: string;
  textPrimary: string;
  textSecondary: string;
  linkColor: string;
  skeletonBase: string;
  skeltonHighlight: string;
  borderLight: string;
  borderDark: string;
  [key: string]: string;
  hoverLinkBackground?: string;
  hoverLinkColor?: string;
  activeLinkBackground?: string;
  activeLinkColor?: string;
  focusLinkBackground?: string;
  focusLinkColor?: string;
}

interface FontSize {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  [key: string]: string;
}
interface Breakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

interface Spacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
}

export interface Theme {
  colors: ThemeColors;
  fonts: FontSize;
  breakpoints: Breakpoints;
  spacing: Spacing;
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

type FontSizeKey = keyof Theme['fonts'];
type ColorKey = keyof Theme['colors'];

export interface LabelProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?:
    | 'bold'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  color?: 'primary' | 'secondary' | 'error' | 'textPrimary' | 'textSecondary';
}

export interface IconWrapperProps {
  size?: string;
  color?: keyof Theme['colors'];
}
