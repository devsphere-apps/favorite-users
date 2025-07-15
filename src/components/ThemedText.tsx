import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 
    | 'display'    // Large titles, hero sections
    | 'h1'         // Main headings
    | 'h2'         // Section headings
    | 'h3'         // Subsection headings
    | 'body1'      // Primary body text
    | 'body2'      // Secondary body text
    | 'caption'    // Small text, labels
    | 'button'     // Button text
    | 'overline';  // All caps small text
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  variant = 'body1',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        styles[variant],
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  display: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  h1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '600',
    letterSpacing: -0.25,
  },
  h3: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
  },
  body1: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  body2: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  button: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    letterSpacing: 0.25,
  },
  overline: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
