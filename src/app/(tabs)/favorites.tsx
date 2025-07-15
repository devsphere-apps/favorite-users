import { Card } from '@/components/Card';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useToast } from '@/contexts/ToastContext';
import { useUserStore } from '@/store/userStore';
import { User } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { View } from 'react-native';

const BADGE_COLORS = {
  gold: 'bg-yellow-500',
  silver: 'bg-gray-400',
  bronze: 'bg-orange-700',
  new: 'bg-green-500',
};

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const FavoriteCard = ({ user, onRemove }: { user: User; onRemove: () => void }) => {
  const { colorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];
  
  // Generate a unique avatar URL based on the user's name
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/png?seed=${encodeURIComponent(user.name)}`;

  return (
    <Card variant="elevated" animated>
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
          onPress={onRemove}
          animate={({ pressed }) => ({
            scale: pressed ? 0.9 : 1,
          })}
          transition={{ type: 'timing', duration: 100 }}
        >
          <Ionicons
            name="heart"
            size={24}
            color={theme.primary}
          />
        </MotiPressable>
      </View>
    </Card>
  );
};

const BadgeFilter = () => {
  const filters = useUserStore((state) => state.filters);
  const filterUsers = useUserStore((state) => state.filterUsers);
  const badges = ['gold', 'silver', 'bronze', 'new'] as const;
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

export default function FavoritesScreen() {
  const { showToast } = useToast();
  const favorites = useUserStore((state) => state.favorites);
  const toggleFavorite = useUserStore((state) => state.toggleFavorite);
  const filters = useUserStore((state) => state.filters);
  const { colorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

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
    <ThemedView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400 }}
        className="flex-1"
      >
        <BadgeFilter />

        <View className="px-4">
          {filteredFavorites.length === 0 ? (
            <Card variant="outlined" animated>
              <View className="items-center py-8">
                <Ionicons 
                  name="heart-outline" 
                  size={48} 
                  color={theme.textSecondary} 
                />
                <ThemedText variant="h3" className="mt-4 mb-2">
                  No favorites yet
                </ThemedText>
                <ThemedText variant="body2" className="text-center text-gray-600 dark:text-gray-400">
                  Start adding your favorite users from the All Users tab
                </ThemedText>
              </View>
            </Card>
          ) : (
            <View className="space-y-4">
              {filteredFavorites.map((user) => (
                <FavoriteCard 
                  key={user.id} 
                  user={user} 
                  onRemove={() => handleRemove(user)} 
                />
              ))}
            </View>
          )}
        </View>
      </MotiView>
    </ThemedView>
  );
} 