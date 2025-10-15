import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import IntensityTag from './IntensityTag';
import CapacityBar from './CapacityBar';

const SessionCard = ({
  title,
  coach,
  startTime,
  occupancy,
  intensity = 'Media',
  onPress,
  status = 'Disponible',
}) => {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: theme.colors.surface,
        borderRadius: theme.shape.radiusXl,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.04)',
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.colors.textPrimary, fontSize: 18, fontWeight: '600' }}>
            {title}
          </Text>
          <Text style={{ color: theme.colors.textSecondary, marginTop: 4 }}>
            {coach} · {startTime}
          </Text>
        </View>
        <IntensityTag level={intensity} />
      </View>
      <CapacityBar occupancy={occupancy} />
      <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 999,
            backgroundColor: theme.colors.elevated,
          }}
        >
          <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>{status}</Text>
        </View>
        <Feather name="arrow-right" size={18} color={theme.colors.textSecondary} />
      </View>
    </Pressable>
  );
};

export default SessionCard;
