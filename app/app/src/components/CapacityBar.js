import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const capacityStates = [
  { threshold: 0.5, label: 'Ahora cómodo' },
  { threshold: 0.8, label: 'Lleno' },
  { threshold: 1, label: 'Pico' },
];

const CapacityBar = ({ occupancy = 0 }) => {
  const { theme } = useTheme();
  const percentage = Math.min(Math.max(occupancy, 0), 1);
  const state = capacityStates.find((item) => percentage <= item.threshold) ||
    capacityStates[capacityStates.length - 1];

  return (
    <View>
      <View
        style={{
          height: 12,
          borderRadius: 999,
          backgroundColor: theme.colors.elevated,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: `${percentage * 100}%`,
            height: '100%',
            backgroundColor: theme.colors.accent,
          }}
        />
      </View>
      <Text
        style={{
          color: theme.colors.textSecondary,
          marginTop: 8,
          fontSize: 12,
        }}
      >
        {state.label} · {Math.round(percentage * 100)}%
      </Text>
    </View>
  );
};

export default CapacityBar;
