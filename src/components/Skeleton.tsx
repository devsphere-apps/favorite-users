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