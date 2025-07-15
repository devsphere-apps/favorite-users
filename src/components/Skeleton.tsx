import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  className?: string;
}

export function Skeleton({ width = '100%', height = 20, className = '' }: SkeletonProps) {
  const { colorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  return (
    <View
      style={{ width, height }}
      className={`bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse ${className}`}
    />
  );
}

export function UserCardSkeleton() {
  return (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <View className="flex-1">
        <Skeleton width="60%" height={24} className="mb-2" />
        <Skeleton width="40%" height={16} />
      </View>
      <Skeleton width={32} height={32} className="rounded-full" />
    </View>
  );
}

export function UserDetailSkeleton() {
  return (
    <View className="p-4">
      {/* Header */}
      <View className="mb-6">
        <Skeleton width="70%" height={32} className="mb-2" />
        <Skeleton width="40%" height={20} />
      </View>

      {/* Contact Info */}
      <View className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
        <Skeleton width="40%" height={24} className="mb-4" />
        <View className="space-y-3">
          <Skeleton width="80%" height={20} />
          <Skeleton width="70%" height={20} />
          <Skeleton width="60%" height={20} />
        </View>
      </View>

      {/* Address */}
      <View className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
        <Skeleton width="30%" height={24} className="mb-4" />
        <View className="space-y-2">
          <Skeleton width="90%" height={20} />
          <Skeleton width="70%" height={20} />
        </View>
      </View>

      {/* Company */}
      <View className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <Skeleton width="35%" height={24} className="mb-4" />
        <View className="space-y-2">
          <Skeleton width="50%" height={20} />
          <Skeleton width="85%" height={20} />
          <Skeleton width="75%" height={20} />
        </View>
      </View>
    </View>
  );
} 