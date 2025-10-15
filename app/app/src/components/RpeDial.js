import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const values = Array.from({ length: 10 }, (_, index) => index + 1);

const RpeDial = ({ value = 6, onChange }) => {
  const { theme } = useTheme();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {values.map((item) => {
        const isActive = item === value;
        return (
          <Pressable
            key={item}
            accessibilityRole="button"
            accessibilityLabel={`RPE ${item}`}
            onPress={() => onChange?.(item)}
            style={({ pressed }) => [{
              width: 36,
              height: 36,
              borderRadius: 18,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isActive ? theme.colors.accent : theme.colors.elevated,
              transform: [{ scale: pressed ? 0.95 : 1 }],
            }]}
          >
            <Text
              style={{
                color: isActive ? '#0B0B0F' : theme.colors.textSecondary,
                fontWeight: '600',
              }}
            >
              {item}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default RpeDial;
