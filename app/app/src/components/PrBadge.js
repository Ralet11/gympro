import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const PrBadge = ({ label, value }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.elevated,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
      }}
    >
      <Feather name="star" size={16} color={theme.colors.accent} />
      <Text style={{ color: theme.colors.textPrimary, marginLeft: 8, fontWeight: '600' }}>
        {label}: {value}
      </Text>
    </View>
  );
};

export default PrBadge;
