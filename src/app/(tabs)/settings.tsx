import { Card } from '@/components/Card';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useColorScheme } from 'nativewind';
import { Switch, View } from 'react-native';

type SettingItemProps = {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  description: string;
  action: React.ReactNode;
};

const SettingItem = ({ icon, title, description, action }: SettingItemProps) => {
  const { colorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  return (
    <View className="flex-row items-center justify-between p-4">
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 items-center justify-center mr-4">
          <Ionicons name={icon} size={24} color={theme.primary} />
        </View>
        <View className="flex-1">
          <ThemedText variant="h3">{title}</ThemedText>
          <ThemedText variant="body2" className="text-gray-600 dark:text-gray-400 mt-1">
            {description}
          </ThemedText>
        </View>
      </View>
      {action}
    </View>
  );
};

export default function SettingsScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400 }}
        className="p-4"
      >
        <ThemedText variant="h1" className="mb-6">Settings</ThemedText>

        {/* Appearance */}
        <Card variant="elevated" animated>
          <SettingItem
            icon="moon"
            title="Dark Mode"
            description="Toggle dark/light theme"
            action={
              <Switch
                value={colorScheme === 'dark'}
                onValueChange={toggleColorScheme}
                trackColor={{ false: theme.disabled, true: theme.primary }}
                thumbColor={theme.surface}
                ios_backgroundColor={theme.disabled}
              />
            }
          />
        </Card>

        {/* About Section */}
        <Card variant="elevated" animated className="mt-4">
          <View className="p-4">
            <ThemedText variant="h3" className="mb-2">About</ThemedText>
            <ThemedText variant="body1" className="text-gray-600 dark:text-gray-400">
              Favorite Users App v1.0.0
            </ThemedText>
            <ThemedText variant="body2" className="text-gray-600 dark:text-gray-400 mt-2">
              A simple app to manage your favorite users. Built with React Native and Expo.
            </ThemedText>
          </View>
        </Card>

        {/* Credits */}
        <Card variant="outlined" animated className="mt-4">
          <View className="p-4">
            <ThemedText variant="h3" className="mb-2">Credits</ThemedText>
            <ThemedText variant="body2" className="text-gray-600 dark:text-gray-400">
              Icons by Ionicons
            </ThemedText>
            <ThemedText variant="body2" className="text-gray-600 dark:text-gray-400 mt-1">
              Data from JSONPlaceholder
            </ThemedText>
          </View>
        </Card>
      </MotiView>
    </View>
  );
} 