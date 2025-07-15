import { UserCardSkeleton } from '@/components/Skeleton';
import { Colors } from '@/constants/Colors';
import { useToast } from '@/contexts/ToastContext';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useUserStore } from '@/store/userStore';
import { User } from '@/types/user';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function UsersScreen() {
  const router = useRouter();
  const isConnected = useNetworkStatus();
  const { colorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];
  const { showToast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'email'>('name');
  
  const { users, favorites, isLoading, fetchUsers, toggleFavorite, searchUsers, sortUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRefresh = () => {
    if (isConnected) {
      fetchUsers();
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleSort = () => {
    const newSortBy = sortBy === 'name' ? 'email' : 'name';
    setSortBy(newSortBy);
    sortUsers(newSortBy);
  };

  const handleToggleFavorite = (userId: number, userName: string) => {
    toggleFavorite(userId);
    const isFavorite = !favorites.has(userId);
    showToast(
      isFavorite 
        ? `Added ${userName} to favorites` 
        : `Removed ${userName} from favorites`,
      isFavorite ? 'success' : 'info'
    );
  };

  const renderItem = ({ item }: { item: User }) => (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
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
      <TouchableOpacity
        onPress={() => handleToggleFavorite(item.id, item.name)}
        className="p-2"
      >
        <Ionicons
          name={favorites.has(item.id) ? 'heart' : 'heart-outline'}
          size={24}
          color={favorites.has(item.id) ? theme.primary : theme.gray}
        />
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    if (isLoading && users.length === 0) {
      return (
        <>
          {Array.from({ length: 8 }).map((_, index) => (
            <UserCardSkeleton key={index} />
          ))}
        </>
      );
    }

    const filteredUsers = searchQuery ? searchUsers(searchQuery) : users;

    return (
      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            colors={[theme.primary]}
            tintColor={theme.primary}
          />
        }
        className="flex-1"
      />
    );
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      {!isConnected && (
        <View className="bg-warning-500 p-2">
          <Text className="text-white text-center">You are offline</Text>
        </View>
      )}
      
      <View className="p-4 flex-row items-center space-x-2">
        <View className="flex-1 flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
          <Ionicons name="search" size={20} color={theme.gray} />
          <TextInput
            className="flex-1 ml-2 text-black dark:text-white"
            placeholder="Search users..."
            placeholderTextColor={theme.gray}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity
          onPress={handleSort}
          className="bg-primary-500 p-2 rounded-lg"
        >
          <Ionicons 
            name={sortBy === 'name' ? 'text' : 'mail'} 
            size={20} 
            color="white" 
          />
        </TouchableOpacity>
      </View>

      {renderContent()}
    </View>
  );
}
