import { Colors } from '@/constants/Colors';
import { MotiView } from 'moti';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

export interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'filled';
  children: React.ReactNode;
  animated?: boolean;
}

export function Card({ 
  variant = 'elevated', 
  style, 
  children,
  animated = false,
  ...rest 
}: CardProps) {
  const { colorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  const cardStyle = [
    styles.base,
    variant === 'elevated' && {
      backgroundColor: theme.surface,
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: colorScheme === 'dark' ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    variant === 'outlined' && {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.border,
    },
    variant === 'filled' && {
      backgroundColor: theme.card,
    },
    style,
  ];

  if (animated) {
    return (
      <MotiView
        style={cardStyle}
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 300 }}
        {...rest}
      >
        {children}
      </MotiView>
    );
  }

  return (
    <View style={cardStyle} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 16,
    padding: 16,
    margin: 8,
  },
}); 