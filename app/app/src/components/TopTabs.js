import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const TopTabs = ({ options, active, onChange }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.elevated,
        borderRadius: theme.shape.radiusLg,
        padding: 4,
        marginBottom: 16,
      }}
    >
      {options.map((option) => {
        const isActive = option === active;
        return (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            style={({ pressed }) => ({
              flex: 1,
              paddingVertical: 10,
              alignItems: 'center',
              borderRadius: theme.shape.radiusLg,
              backgroundColor: isActive ? theme.colors.accent : 'transparent',
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <Text
              style={{
                color: isActive ? '#0B0B0F' : theme.colors.textSecondary,
                fontWeight: '600',
              }}
            >
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default TopTabs;
