import { Card } from '@/components/Card';
import { Skeleton } from '@/components/Skeleton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useToast } from '@/contexts/ToastContext';
import { useUserStore } from '@/store/userStore';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { MotiPressable } from 'moti/interactions';
import { useColorScheme } from 'nativewind';
import { ScrollView, View } from 'react-native';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const InfoRow = ({ icon, text }: { icon: IconName; text: string }) => {
  const { colorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  return (
    <View className="flex-row items-center py-2">
      <Ionicons name={icon} size={20} color={theme.textSecondary} />
      <ThemedText variant="body1" className="ml-3 flex-1">
        {text}
      </ThemedText>
    </View>
  );
};

export default function UserDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];
  const { showToast } = useToast();
  
  const { users, favorites, toggleFavorite } = useUserStore();
  const user = users.find(u => u.id === Number(id));
  const isFavorite = favorites.some(f => f.id === Number(id));

  const handleToggleFavorite = () => {
    if (user) {
      toggleFavorite(user);
      showToast(
        isFavorite 
          ? `Removed ${user.name} from favorites` 
          : `Added ${user.name} to favorites`,
        isFavorite ? 'info' : 'success'
      );
    }
  };

  // Generate a unique avatar URL based on the user's name
  const avatarUrl = user ? `https://api.dicebear.com/7.x/avataaars/png?seed=${encodeURIComponent(user.name)}` : '';

  if (!user) {
    return (
      <ThemedView className="flex-1">
        <Skeleton type="userList" />
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1">
      <ScrollView className="flex-1">
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 400 }}
          className="p-4"
        >
          {/* Header */}
          <Card variant="filled" animated>
            <View className="items-center mb-6">
              <Image
                source={avatarUrl}
                placeholder={blurhash}
                contentFit="cover"
                transition={200}
                className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mb-4"
              />
              <View className="items-center">
                <ThemedText variant="h1" className="text-center mb-1">
                  {user.name}
                </ThemedText>
                <ThemedText variant="body2" className="text-gray-600 dark:text-gray-400 text-center">
                  @{user.username}
                </ThemedText>
              </View>
            </View>
            <View className="flex-row justify-center">
              <View
                className={`flex-row items-center px-4 py-2 rounded-full ${
                  isFavorite ? 'bg-primary-50 dark:bg-primary-900/30' : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                <MotiPressable
                  onPress={handleToggleFavorite}
                  animate={({ pressed }) => ({
                    scale: pressed ? 0.9 : 1,
                  })}
                  transition={{ type: 'timing', duration: 100 }}
                >
                  <View className="flex-row items-center">
                    <Ionicons
                      name={isFavorite ? 'heart' : 'heart-outline'}
                      size={20}
                      color={isFavorite ? theme.primary : theme.textSecondary}
                      style={{ marginRight: 8 }}
                    />
                    <ThemedText variant="button">
                      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </ThemedText>
                  </View>
                </MotiPressable>
              </View>
            </View>
          </Card>

          {/* Contact Info */}
          <Card variant="filled" animated>
            <ThemedText variant="h3" className="mb-4">
              Contact Information
            </ThemedText>
            <View className="space-y-1">
              <InfoRow icon="mail-outline" text={user.email} />
              <InfoRow icon="call-outline" text={user.phone} />
              <InfoRow icon="globe-outline" text={user.website} />
            </View>
          </Card>

          {/* Address */}
          <Card variant="filled" animated>
            <ThemedText variant="h3" className="mb-4">
              Address
            </ThemedText>
            <View className="space-y-1">
              <InfoRow 
                icon="location-outline" 
                text={`${user.address.street}, ${user.address.suite}`} 
              />
              <InfoRow 
                icon="business-outline" 
                text={`${user.address.city}, ${user.address.zipcode}`} 
              />
            </View>
          </Card>

          {/* Company */}
          <Card variant="filled" animated>
            <ThemedText variant="h3" className="mb-4">
              Company
            </ThemedText>
            <View className="space-y-1">
              <InfoRow icon="briefcase-outline" text={user.company.name} />
              <InfoRow icon="bulb-outline" text={user.company.catchPhrase} />
              <InfoRow icon="trending-up-outline" text={user.company.bs} />
            </View>
          </Card>
        </MotiView>
      </ScrollView>
    </ThemedView>
  );
} 