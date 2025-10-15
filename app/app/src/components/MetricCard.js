import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const MetricCard = ({ label, value, trend }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        padding: 20,
        borderRadius: theme.shape.radiusXl,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.04)',
        marginBottom: 16,
      }}
    >
      <Text style={{ color: theme.colors.textSecondary, fontSize: 14 }}>{label}</Text>
      <Text style={{ color: theme.colors.textPrimary, fontSize: 24, fontWeight: '600', marginTop: 8 }}>
        {value}
      </Text>
      {trend ? (
        <Text style={{ color: theme.colors.success, marginTop: 8, fontSize: 12 }}>{trend}</Text>
      ) : null}
    </View>
  );
};

export default MetricCard;
