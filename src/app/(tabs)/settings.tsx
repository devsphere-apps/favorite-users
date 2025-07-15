import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { Switch, Text, View } from 'react-native';

export default function SettingsScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <View className="p-4">
        <Text className="text-xl font-bold text-black dark:text-white mb-6">
          Settings
        </Text>

        {/* Theme Toggle */}
        <View className="flex-row items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
          <View className="flex-row items-center">
            <Ionicons 
              name={colorScheme === 'dark' ? 'moon' : 'sunny'} 
              size={24} 
              color={theme.primary}
              className="mr-3"
            />
            <View>
              <Text className="text-base font-medium text-black dark:text-white">
                Dark Mode
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Toggle dark/light theme
              </Text>
            </View>
          </View>
          <Switch
            value={colorScheme === 'dark'}
            onValueChange={toggleColorScheme}
            trackColor={{ false: theme.gray, true: theme.primary }}
            thumbColor="white"
          />
        </View>

        {/* About Section */}
        <View className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <Text className="text-base font-medium text-black dark:text-white mb-2">
            About
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            Favorite Users App v1.0.0
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            A simple app to manage your favorite users
          </Text>
        </View>
      </View>
    </View>
  );
} 