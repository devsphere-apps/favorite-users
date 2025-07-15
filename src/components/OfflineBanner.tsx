import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import { MotiView } from 'moti';
import { useColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedText } from './ThemedText';

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);
  const { colorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    // Initial check
    NetInfo.fetch().then(state => {
      setIsOffline(!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (!isOffline) return null;

  return (
    <MotiView
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -50 }}
      transition={{ type: 'spring', damping: 15 }}
      style={{ 
        backgroundColor: theme.error,
        paddingTop: insets.top
      }}
      className="absolute top-0 left-0 right-0 z-50 px-4 py-2 flex-row items-center justify-center shadow-lg"
    >
      <Ionicons name="cloud-offline" size={20} color="white" className="mr-2" />
      <ThemedText variant="button" className="text-white">
        You're offline - Using cached data
      </ThemedText>
    </MotiView>
  );
} 