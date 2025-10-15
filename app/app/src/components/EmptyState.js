import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const EmptyState = ({ icon = 'inbox', title, description, action }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        padding: 24,
        borderRadius: theme.shape.radiusXl,
        backgroundColor: theme.colors.elevated,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.04)',
      }}
    >
      <Feather name={icon} size={32} color={theme.colors.textSecondary} />
      <Text
        style={{
          color: theme.colors.textPrimary,
          fontSize: 18,
          fontWeight: '600',
          marginTop: 12,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: theme.colors.textSecondary,
          marginTop: 8,
          textAlign: 'center',
          fontSize: 14,
        }}
      >
        {description}
      </Text>
      {action}
    </View>
  );
};

export default EmptyState;
