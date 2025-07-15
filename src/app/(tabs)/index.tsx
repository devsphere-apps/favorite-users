import { Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { MotiPressable } from 'moti/interactions';
import { useColorScheme } from 'nativewind';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
import { Card } from '../../components/Card';
import { Skeleton } from '../../components/Skeleton';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { Colors } from '../../constants/Colors';
import { useToast } from '../../contexts/ToastContext';
import { useUserStore } from '../../store/userStore';
import { Badge, User } from '../../types';

const BADGE_COLORS = {
  gold: 'bg-yellow-500',
  silver: 'bg-gray-400',
  bronze: 'bg-orange-700',
  new: 'bg-green-500',
};

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const UserCard = ({ user }: { user: User }) => {
  const { colorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];
  const toggleFavorite = useUserStore((state) => state.toggleFavorite);
  const favorites = useUserStore((state) => state.favorites);
  const { showToast } = useToast();

  const isFavorite = favorites.some((f) => f.id === user.id);

  const handleToggleFavorite = () => {
    toggleFavorite(user);
    showToast(
      isFavorite ? 'Removed from favorites' : 'Added to favorites',
      'success'
    );
  };

  // Generate a unique avatar URL based on the user's name
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/png?seed=${encodeURIComponent(user.name)}`;

  return (
    <Card animated variant="elevated">
      <View className="flex-row justify-between items-start">
        <View className="flex-row flex-1 space-x-3">
          <Link href={`/user/${user.id}`} asChild>
            <Image
              source={avatarUrl}
              placeholder={blurhash}
              contentFit="cover"
              transition={200}
              className="w-12 h-12 rounded-full bg-gray-200"
            />
          </Link>
          <View className="flex-1">
            <Link href={`/user/${user.id}`} asChild>
              <ThemedText variant="h3" className="mb-1">{user.name}</ThemedText>
            </Link>
            <ThemedText variant="body2" className="text-gray-600 dark:text-gray-400">
              {user.email}
            </ThemedText>
            {user.badge && (
              <View className={`${BADGE_COLORS[user.badge]} px-2 py-1 rounded-full self-start mt-2`}>
                <ThemedText variant="caption" className="text-white capitalize">
                  {user.badge}
                </ThemedText>
              </View>
            )}
          </View>
        </View>
        <MotiPressable
          onPress={handleToggleFavorite}
          animate={({ pressed }) => ({
            scale: pressed ? 0.9 : 1,
          })}
          transition={{ type: 'timing', duration: 100 }}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? theme.primary : theme.textSecondary}
          />
        </MotiPressable>
      </View>
    </Card>
  );
};

const BadgeFilter = () => {
  const filters = useUserStore((state) => state.filters);
  const filterUsers = useUserStore((state) => state.filterUsers);
  const badges: Badge[] = ['gold', 'silver', 'bronze', 'new'];
  const { colorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  return (
    <View className="mb-4 pt-4">
      <ThemedText variant="h3" className="mb-3 px-4">
        Filter by Badge
      </ThemedText>
      <View className="flex-row px-4 space-x-3">
        {badges.map((badge) => {
          const isSelected = filters.badge === badge;
          return (
            <MotiPressable
              key={badge}
              onPress={() => filterUsers({ badge: isSelected ? undefined : badge })}
              animate={({ pressed }) => ({
                scale: pressed ? 0.95 : 1,
                opacity: pressed ? 0.9 : 1,
              })}
            >
              <View
                className={`px-4 py-2 rounded-full flex-row items-center space-x-1 ${
                  isSelected
                    ? BADGE_COLORS[badge]
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                {isSelected && (
                  <Ionicons 
                    name="checkmark-circle" 
                    size={16} 
                    color="white" 
                    style={{ marginRight: 4 }} 
                  />
                )}
                <ThemedText
                  variant="button"
                  className={`${isSelected ? 'text-white' : ''} capitalize`}
                >
                  {badge}
                </ThemedText>
              </View>
            </MotiPressable>
          );
        })}
      </View>
    </View>
  );
};

export default function AllUsersScreen() {
  const {
    users,
    loading,
    error,
    hasMore,
    fetchUsers,
    loadMoreUsers,
    filters,
    filterUsers,
    lastFetchTimestamp,
  } = useUserStore();

  const { showToast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  // Monitor network state
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected);
    });

    // Initial check
    NetInfo.fetch().then(state => {
      setIsOffline(!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (error && !isOffline) {
      showToast(error, 'error');
    }
  }, [error, showToast, isOffline]);

  const handleRefresh = useCallback(async () => {
    if (isOffline) {
      showToast('Cannot refresh while offline - showing cached data', 'info');
      return;
    }

    try {
      setIsRefreshing(true);
      await fetchUsers();
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchUsers, showToast, isOffline]);

  const handleLoadMore = async () => {
    if (loading || !hasMore || isOffline) return;
    await loadMoreUsers();
  };

  const renderFooter = () => {
    if (!loading || isOffline) return null;
    return (
      <View className="py-4">
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const filteredUsers = users.filter((user) => {
    if (filters.badge && user.badge !== filters.badge) {
      return false;
    }
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    }
    return true;
  });

  if (loading && users.length === 0) {
    return <Skeleton type="userList" />;
  }

  const renderEmptyComponent = () => {
    if (isOffline && !users.length) {
      return (
        <View className="p-4 items-center">
          <Ionicons name="cloud-offline" size={48} color="gray" className="mb-4" />
          <ThemedText className="text-center text-gray-600 dark:text-gray-400">
            No cached data available.{'\n'}Please connect to the internet.
          </ThemedText>
        </View>
      );
    }

    return (
      <ThemedText className="text-center p-4">No users found</ThemedText>
    );
  };

  const renderOfflineNotice = () => {
    if (!isOffline || !lastFetchTimestamp) return null;

    const lastFetchDate = new Date(lastFetchTimestamp).toLocaleString();
    return (
      <View className="bg-yellow-50 dark:bg-yellow-900 p-4 mb-4">
        <ThemedText className="text-yellow-800 dark:text-yellow-100 text-center">
          Showing cached data from {lastFetchDate}
        </ThemedText>
      </View>
    );
  };

  return (
    <ThemedView className="flex-1">
      {renderOfflineNotice()}
      <BadgeFilter />
      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => <UserCard user={item} />}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ListEmptyComponent={renderEmptyComponent}
      />
    </ThemedView>
  );
}
