import { Link } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, View } from 'react-native';
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

  return (
    <ThemedView className="p-4 m-2 rounded-lg">
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <Link href={`/user/${user.id}`} asChild>
            <ThemedText className="text-lg font-bold">{user.name}</ThemedText>
          </Link>
          <ThemedText className="text-sm">{user.email}</ThemedText>
          {user.badge && (
            <View
              className={`${
                BADGE_COLORS[user.badge]
              } px-2 py-1 rounded-full self-start mt-1`}
            >
              <ThemedText className="text-white text-xs capitalize">
                {user.badge}
              </ThemedText>
            </View>
          )}
        </View>
        <ThemedText
          onPress={handleToggleFavorite}
          className="text-2xl"
        >
          {isFavorite ? '❤️' : '🤍'}
        </ThemedText>
      </View>
    </ThemedView>
  );
};

const BadgeFilter = () => {
  const filters = useUserStore((state) => state.filters);
  const filterUsers = useUserStore((state) => state.filterUsers);
  const badges: Badge[] = ['gold', 'silver', 'bronze', 'new'];

  return (
    <View className="flex-row p-2 space-x-2">
      {badges.map((badge) => (
        <ThemedText
          key={badge}
          onPress={() =>
            filterUsers({ badge: filters.badge === badge ? undefined : badge })
          }
          className={`px-3 py-1 rounded-full ${
            filters.badge === badge
              ? BADGE_COLORS[badge]
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          {badge}
        </ThemedText>
      ))}
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
  } = useUserStore();

  const { showToast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (error) {
      showToast(error, 'error');
    }
  }, [error, showToast]);

  const handleRefresh = useCallback(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadMoreUsers();
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
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

  return (
    <ThemedView className="flex-1">
      <View className="p-4">
        <ThemedText
          className="text-lg mb-2 font-semibold"
          onPress={() => filterUsers({ searchQuery: undefined })}
        >
          Filter by badge:
        </ThemedText>
        <BadgeFilter />
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={({ item }) => <UserCard user={item} />}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <ThemedText className="text-center p-4">No users found</ThemedText>
        }
      />
    </ThemedView>
  );
}
