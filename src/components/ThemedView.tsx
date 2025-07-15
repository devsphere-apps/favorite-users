import { useColorScheme } from 'nativewind';
import { StyleSheet, View, type ViewProps } from 'react-native';
import { Colors } from '../constants/Colors';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const { colorScheme } = useColorScheme();
  const theme = Colors[colorScheme || 'light'];
  
  const backgroundColor = colorScheme === 'dark' ? darkColor : lightColor;
  
  return (
    <View
      style={StyleSheet.flatten([
        { backgroundColor: backgroundColor || theme.background },
        style
      ])}
      {...otherProps}
    />
  );
}
