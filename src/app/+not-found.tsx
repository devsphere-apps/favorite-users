import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { MotiView } from 'moti';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

export default function NotFoundScreen() {
  const { colorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  return (
    <>
      <Stack.Screen options={{ 
        title: 'Oops!',
        headerTitleStyle: {
          fontSize: 17,
          fontWeight: '600',
        },
      }} />
      <ThemedView className="flex-1 items-center justify-center p-8">
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="items-center"
        >
          <Ionicons 
            name="alert-circle-outline" 
            size={64} 
            color={theme.textSecondary} 
            className="mb-6" 
          />
          <ThemedText variant="h1" className="text-center mb-2">
            Page Not Found
          </ThemedText>
          <ThemedText variant="body1" className="text-center text-gray-600 dark:text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </ThemedText>
          <Link href="/" asChild>
            <View className="bg-primary-500 dark:bg-primary-600 px-6 py-3 rounded-xl">
              <ThemedText variant="button" className="text-white">
                Go to Home
              </ThemedText>
            </View>
          </Link>
        </MotiView>
      </ThemedView>
    </>
  );
}
