import { MotiView } from 'moti';
import React from 'react';
import { View } from 'react-native';
import { Card } from './Card';
import { ThemedView } from './ThemedView';

interface SkeletonProps {
  type: 'userList' | 'userDetail';
}

const ShimmerEffect = () => (
  <MotiView
    from={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{
      type: 'timing',
      duration: 1000,
      loop: true,
    }}
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
  />
);

const UserCardSkeleton = () => (
  <Card variant="elevated">
    <View className="flex-row justify-between items-start">
      <View className="flex-1">
        <View className="h-7 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2">
          <ShimmerEffect />
        </View>
        <View className="h-5 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-lg">
          <ShimmerEffect />
        </View>
        <View className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
          <ShimmerEffect />
        </View>
      </View>
      <View className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700">
        <ShimmerEffect />
      </View>
    </View>
  </Card>
);

export const Skeleton: React.FC<SkeletonProps> = ({ type }) => {
  if (type === 'userList') {
    return (
      <ThemedView className="flex-1 p-4">
        <View className="mb-6">
          <View className="h-8 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4">
            <ShimmerEffect />
          </View>
          <View className="flex-row space-x-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <View
                key={i}
                className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"
              >
                <ShimmerEffect />
              </View>
            ))}
          </View>
        </View>
        {Array.from({ length: 6 }).map((_, index) => (
          <UserCardSkeleton key={index} />
        ))}
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1 p-4">
      <Card variant="elevated">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1">
            <View className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2">
              <ShimmerEffect />
            </View>
            <View className="h-5 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-lg">
              <ShimmerEffect />
            </View>
          </View>
          <View className="h-7 w-7 rounded-full bg-gray-200 dark:bg-gray-700">
            <ShimmerEffect />
          </View>
        </View>
      </Card>

      {['Contact Info', 'Address', 'Company'].map((section, index) => (
        <Card key={section} variant="filled" className="mt-4">
          <View className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4">
            <ShimmerEffect />
          </View>
          {Array.from({ length: 3 }).map((_, i) => (
            <View key={i} className="flex-row items-center mb-3 last:mb-0">
              <View className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700 mr-3">
                <ShimmerEffect />
              </View>
              <View className="h-5 flex-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
                <ShimmerEffect />
              </View>
            </View>
          ))}
        </Card>
      ))}
    </ThemedView>
  );
}; 