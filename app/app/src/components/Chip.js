import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const Chip = ({ label, selected = false, onPress, icon }) => {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: selected
            ? theme.colors.accent
            : theme.colors.elevated,
          borderColor: selected ? theme.colors.accent : theme.colors.border,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      {icon}
      <Text
        style={{
          color: selected ? '#0B0B0F' : theme.colors.textPrimary,
          marginLeft: icon ? theme.spacing(0.5) : 0,
          fontSize: 14,
          fontWeight: '600',
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 12,
  },
});

export default Chip;
