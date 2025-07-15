import { Colors } from '@/constants/Colors';
import { useUserStore } from '@/store/userStore';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function UserDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];
  
  const { users, favorites, toggleFavorite } = useUserStore();
  const user = users.find(u => u.id === Number(id));

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-gray-900">
        <Text className="text-black dark:text-white">User not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      <View className="p-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-2xl font-bold text-black dark:text-white">
              {user.name}
            </Text>
            <Text className="text-gray-600 dark:text-gray-400">
              @{user.username}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => toggleFavorite(user.id)}
            className="p-2"
          >
            <Ionicons
              name={favorites.has(user.id) ? 'heart' : 'heart-outline'}
              size={28}
              color={favorites.has(user.id) ? theme.primary : theme.gray}
            />
          </TouchableOpacity>
        </View>

        {/* Contact Info */}
        <View className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
          <Text className="text-lg font-semibold text-black dark:text-white mb-2">
            Contact Information
          </Text>
          <View className="space-y-2">
            <View className="flex-row items-center">
              <Ionicons name="mail-outline" size={20} color={theme.gray} />
              <Text className="ml-2 text-gray-600 dark:text-gray-400">
                {user.email}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="call-outline" size={20} color={theme.gray} />
              <Text className="ml-2 text-gray-600 dark:text-gray-400">
                {user.phone}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="globe-outline" size={20} color={theme.gray} />
              <Text className="ml-2 text-gray-600 dark:text-gray-400">
                {user.website}
              </Text>
            </View>
          </View>
        </View>

        {/* Address */}
        <View className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
          <Text className="text-lg font-semibold text-black dark:text-white mb-2">
            Address
          </Text>
          <Text className="text-gray-600 dark:text-gray-400">
            {user.address.street}, {user.address.suite}
          </Text>
          <Text className="text-gray-600 dark:text-gray-400">
            {user.address.city}, {user.address.zipcode}
          </Text>
        </View>

        {/* Company */}
        <View className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <Text className="text-lg font-semibold text-black dark:text-white mb-2">
            Company
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 font-medium">
            {user.company.name}
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 italic mt-1">
            "{user.company.catchPhrase}"
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 mt-1">
            {user.company.bs}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
} 