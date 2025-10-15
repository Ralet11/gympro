import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const HeatStrip = ({ data = [] }) => {
  const { theme } = useTheme();

  return (
    <View style={{ marginTop: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <Text style={{ color: theme.colors.textPrimary, fontWeight: '600' }}>Ocupación hoy</Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>Mejor hora · {data.find((slot) => slot.best)?.label ?? '--'}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        {data.map((slot) => (
          <View key={slot.label} style={{ alignItems: 'center', marginRight: 8 }}>
            <View
              style={{
                width: 16,
                height: 48,
                borderRadius: 12,
                backgroundColor: theme.colors.elevated,
                justifyContent: 'flex-end',
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  width: '100%',
                  height: `${slot.value * 100}%`,
                  backgroundColor: theme.colors.accent,
                  opacity: slot.best ? 1 : 0.5,
                }}
              />
            </View>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 10, marginTop: 4 }}>
              {slot.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default HeatStrip;
