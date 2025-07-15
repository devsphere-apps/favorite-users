/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Colors = {
  light: {
    background: '#FFFFFF',
    text: '#000000',
    primary: '#1D4ED8', // Blue
    secondary: '#9333EA', // Purple
    gray: '#6B7280',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    card: '#F3F4F6',
  },
  dark: {
    background: '#0F172A',
    text: '#FFFFFF',
    primary: '#2563EB',
    secondary: '#A855F7',
    gray: '#9CA3AF',
    success: '#34D399',
    error: '#F87171',
    warning: '#FBBF24',
    card: '#1E293B',
  },
} as const;

export type ColorScheme = keyof typeof Colors;
export type ThemeColors = typeof Colors[ColorScheme];
