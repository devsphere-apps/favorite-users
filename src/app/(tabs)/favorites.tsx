import { UserCardSkeleton } from '@/components/Skeleton';
import { Colors } from '@/constants/Colors';
import { useToast } from '@/contexts/ToastContext';
import { useUserStore } from '@/store/userStore';
import { User } from '@/types/user';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { FlatList, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function FavoritesScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];
  const { showToast } = useToast();
  
  const { users, favorites, isLoading, removeFavorite } = useUserStore();
  const favoriteUsers = users.filter(user => favorites.has(user.id));

  const handleRemoveFavorite = (userId: number, userName: string) => {
    removeFavorite(userId);
    showToast(`Removed ${userName} from favorites`, 'info');
  };

  const renderRightActions = (userId: number) => (
    <View className="bg-error-500 w-20 justify-center items-center">
      <Ionicons name="trash-outline" size={24} color="white" />
    </View>
  );

  const renderItem = ({ item }: { item: User }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item.id)}
      onSwipeableOpen={() => handleRemoveFavorite(item.id, item.name)}
    >
      <View className="flex-row items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <View className="flex-1">
          <Text 
            className="text-lg font-semibold text-black dark:text-white"
            onPress={() => router.push(`/user/${item.id}`)}
          >
            {item.name}
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            {item.email}
          </Text>
        </View>
        <Ionicons
          name="heart"
          size={24}
          color={theme.primary}
        />
      </View>
    </Swipeable>
  );

  const renderContent = () => {
    if (isLoading && users.length === 0) {
      return (
        <>
          {Array.from({ length: 4 }).map((_, index) => (
            <UserCardSkeleton key={index} />
          ))}
        </>
      );
    }

    if (favoriteUsers.length === 0) {
      return (
        <View className="flex-1 justify-center items-center">
          <Ionicons name="heart-outline" size={48} color={theme.gray} />
          <Text className="mt-4 text-gray-600 dark:text-gray-400 text-center">
            No favorite users yet
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={favoriteUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        className="flex-1"
      />
    );
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      {renderContent()}
    </View>
  );
} 