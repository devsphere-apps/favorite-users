import React from 'react';
import { View } from 'react-native';
import { ThemedView } from './ThemedView';

interface SkeletonProps {
  type: 'userList' | 'userDetail';
}

export const Skeleton: React.FC<SkeletonProps> = ({ type }) => {
  if (type === 'userList') {
    return (
      <ThemedView className="flex-1">
        {Array.from({ length: 8 }).map((_, index) => (
          <ThemedView key={index} className="p-4 m-2 rounded-lg">
            <View className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <View className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
          </ThemedView>
        ))}
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1 p-4">
      <View className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
      <View className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
      <View className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
    </ThemedView>
  );
};

export const UserDetailSkeleton: React.FC = () => (
  <ThemedView className="flex-1 p-4">
    {/* Header Skeleton */}
    <View className="flex-row justify-between items-center mb-6">
      <View>
        <View className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
        <View className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
      </View>
      <View className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
    </View>

    {/* Contact Info Skeleton */}
    <View className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
      <View className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
      <View className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <View key={i} className="flex-row items-center">
            <View className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <View className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded ml-2" />
          </View>
        ))}
      </View>
    </View>

    {/* Address Skeleton */}
    <View className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
      <View className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
      <View className="h-5 w-56 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
      <View className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
    </View>

    {/* Company Skeleton */}
    <View className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <View className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
      <View className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
      <View className="h-5 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
      <View className="h-5 w-56 bg-gray-200 dark:bg-gray-700 rounded" />
    </View>
  </ThemedView>
); 