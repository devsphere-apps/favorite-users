import { ToastProvider } from '@/contexts/ToastContext';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="user/[id]" 
            options={{ 
              title: 'User Details',
              headerBackTitle: 'Back'
            }} 
          />
        </Stack>
      </ToastProvider>
    </GestureHandlerRootView>
  );
}
