import { ToastProvider } from '@/contexts/ToastContext';
import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
  return (
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
  );
}
