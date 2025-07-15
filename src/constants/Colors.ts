/**
 * Modern color system with semantic tokens for consistent theming
 */

export const Colors = {
  light: {
    // Base colors
    background: '#FFFFFF',
    surface: '#F8FAFC',
    card: '#F1F5F9',
    border: '#E2E8F0',
    divider: '#CBD5E1',
    
    // Text colors
    text: '#0F172A',
    textSecondary: '#475569',
    textTertiary: '#64748B',
    textInverse: '#FFFFFF',
    
    // Brand colors
    primary: '#2563EB',
    primaryLight: '#60A5FA',
    primaryDark: '#1D4ED8',
    secondary: '#9333EA',
    secondaryLight: '#A855F7',
    secondaryDark: '#7E22CE',
    
    // Status colors
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    
    // Interactive states
    hover: '#F1F5F9',
    pressed: '#E2E8F0',
    focus: '#60A5FA',
    disabled: '#CBD5E1',
  },
  dark: {
    // Base colors
    background: '#0F172A',
    surface: '#1E293B',
    card: '#334155',
    border: '#475569',
    divider: '#475569',
    
    // Text colors
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
    textTertiary: '#94A3B8',
    textInverse: '#0F172A',
    
    // Brand colors
    primary: '#3B82F6',
    primaryLight: '#60A5FA',
    primaryDark: '#2563EB',
    secondary: '#A855F7',
    secondaryLight: '#C084FC',
    secondaryDark: '#9333EA',
    
    // Status colors
    success: '#34D399',
    error: '#F87171',
    warning: '#FBBF24',
    info: '#60A5FA',
    
    // Interactive states
    hover: '#1E293B',
    pressed: '#334155',
    focus: '#60A5FA',
    disabled: '#475569',
  },
} as const;

export type ColorScheme = keyof typeof Colors;
export type ThemeColors = typeof Colors[ColorScheme];
