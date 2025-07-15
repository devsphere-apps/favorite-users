import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { MotiView } from 'moti';
import { useColorScheme } from 'nativewind';
import { Platform } from 'react-native';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          borderTopWidth: 0.5,
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 12,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: theme.surface,
          borderBottomWidth: 0.5,
          borderBottomColor: theme.border,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          fontSize: 17,
          fontWeight: '600',
        },
        headerTintColor: theme.text,
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'All Users',
          tabBarIcon: ({ color, size, focused }) => (
            <MotiView
              animate={{ 
                scale: focused ? 1.1 : 1,
                opacity: focused ? 1 : 0.7,
              }}
              transition={{ 
                type: 'timing',
                duration: 200,
              }}
            >
              <Ionicons name={focused ? 'people' : 'people-outline'} size={size} color={color} />
            </MotiView>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size, focused }) => (
            <MotiView
              animate={{ 
                scale: focused ? 1.1 : 1,
                opacity: focused ? 1 : 0.7,
              }}
              transition={{ 
                type: 'timing',
                duration: 200,
              }}
            >
              <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color={color} />
            </MotiView>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size, focused }) => (
            <MotiView
              animate={{ 
                scale: focused ? 1.1 : 1,
                opacity: focused ? 1 : 0.7,
              }}
              transition={{ 
                type: 'timing',
                duration: 200,
              }}
            >
              <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />
            </MotiView>
          ),
        }}
      />
    </Tabs>
  );
}
