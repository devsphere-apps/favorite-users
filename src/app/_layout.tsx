import { OfflineBanner } from '@/components/OfflineBanner';
import { Colors } from '@/constants/Colors';
import { ToastProvider } from '@/contexts/ToastContext';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.surface,
            },
            headerShadowVisible: false,
            headerTintColor: theme.text,
            headerTitleStyle: {
              fontSize: 17,
              fontWeight: '600',
            },
            contentStyle: {
              backgroundColor: theme.background,
            },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="user/[id]" 
            options={{ 
              title: 'User Details',
              presentation: 'card',
              animation: 'slide_from_right',
              headerTitleAlign: 'center',
              headerBackTitle: 'Back',
            }} 
          />
        </Stack>
        <OfflineBanner />
      </ToastProvider>
    </GestureHandlerRootView>
  );
}
