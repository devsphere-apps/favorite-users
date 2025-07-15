import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'nativewind';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onHide?: () => void;
  visible?: boolean;
}

export function Toast({ 
  message, 
  type = 'success', 
  duration = 2000,
  onHide,
  visible = true
}: ToastProps) {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const { colorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return theme.success;
      case 'error':
        return theme.error;
      case 'info':
        return theme.primary;
      default:
        return theme.success;
    }
  };

  useEffect(() => {
    if (visible) {
      // Show toast
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 15,
          mass: 1,
          stiffness: 120,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Hide toast after duration
      hideTimeoutRef.current = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -100,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start(() => {
          if (onHide) onHide();
        });
      }, duration);

      return () => {
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
      };
    }
  }, [visible, duration, onHide, translateY, opacity]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
          backgroundColor: getBackgroundColor(),
        },
      ]}
    >
      <Text className="text-white font-medium text-center">
        {message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    margin: 16,
    borderRadius: 8,
    zIndex: 9999,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
}); 