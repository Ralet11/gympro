import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const HeroBanner = ({ title, subtitle, badge, icon = 'sun' }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        padding: 24,
        borderRadius: theme.shape.radiusXl,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}
    >
      <View style={{ flex: 1, paddingRight: 16 }}>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 14, marginBottom: 4 }}>
          {badge}
        </Text>
        <Text style={{ color: theme.colors.textPrimary, fontSize: 22, fontWeight: '600' }}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={{ color: theme.colors.textSecondary, marginTop: 8, fontSize: 14 }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: theme.colors.elevated,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Feather name={icon} size={28} color={theme.colors.accent} />
      </View>
    </View>
  );
};

export default HeroBanner;
