import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { TextInput, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChangeText, placeholder = 'Search...' }: SearchBarProps) {
  const { colorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 300 }}
      className="mx-4 mb-4"
    >
      <View
        className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-4 h-12"
        style={{
          borderWidth: 1,
          borderColor: theme.border,
        }}
      >
        <Ionicons 
          name="search" 
          size={20} 
          color={theme.textSecondary} 
          style={{ marginRight: 8 }} 
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.textSecondary}
          style={{ color: theme.text, flex: 1 }}
          className="text-base"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {value ? (
          <Ionicons
            name="close-circle"
            size={20}
            color={theme.textSecondary}
            onPress={() => onChangeText('')}
            style={{ marginLeft: 8 }}
          />
        ) : null}
      </View>
    </MotiView>
  );
} 