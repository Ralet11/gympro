import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const intensityColors = {
  Baja: '#16A34A',
  Media: '#F59E0B',
  Alta: '#EF4444',
};

const IntensityTag = ({ level = 'Media' }) => {
  const { theme } = useTheme();
  const backgroundColor = intensityColors[level] || theme.colors.accent;

  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor,
      }}
    >
      <Text style={{ color: '#0B0B0F', fontSize: 12, fontWeight: '600' }}>{level}</Text>
    </View>
  );
};

export default IntensityTag;
