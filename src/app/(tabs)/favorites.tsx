import { Link } from 'expo-router';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { useToast } from '../../contexts/ToastContext';
import { useUserStore } from '../../store/userStore';
import { Badge, User } from '../../types';

const BADGE_COLORS = {
  gold: 'bg-yellow-500',
  silver: 'bg-gray-400',
  bronze: 'bg-orange-700',
  new: 'bg-green-500',
};

const FavoriteCard = ({ user, onRemove }: { user: User; onRemove: () => void }) => {
  const renderRightActions = () => (
    <ThemedView
      className="bg-red-500 w-20 justify-center items-center"
      style={{ marginVertical: 8 }}
    >
      <ThemedText className="text-white">Remove</ThemedText>
    </ThemedView>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      onSwipeableOpen={onRemove}
      overshootRight={false}
    >
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
        </View>
      </ThemedView>
    </Swipeable>
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

export default function FavoritesScreen() {
  const { favorites, toggleFavorite, filters } = useUserStore();
  const { showToast } = useToast();

  const handleRemove = (user: User) => {
    toggleFavorite(user);
    showToast('Removed from favorites', 'success');
  };

  const filteredFavorites = favorites.filter((user) => {
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

  return (
    <ThemedView className="flex-1">
      <View className="p-4">
        <ThemedText className="text-lg mb-2 font-semibold">
          Filter by badge:
        </ThemedText>
        <BadgeFilter />
      </View>

      <FlatList
        data={filteredFavorites}
        renderItem={({ item }) => (
          <FavoriteCard user={item} onRemove={() => handleRemove(item)} />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <ThemedText className="text-center p-4">
            No favorite users yet
          </ThemedText>
        }
      />
    </ThemedView>
  );
} 