import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const BenefitCard = ({ partner, offer, points, onRedeem }) => {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onRedeem}
      style={({ pressed }) => ({
        width: 220,
        marginRight: 16,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.shape.radiusXl,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.04)',
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: theme.colors.elevated,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Feather name="gift" size={20} color={theme.colors.accent} />
        </View>
        <Text style={{ color: theme.colors.textPrimary, marginLeft: 12, fontWeight: '600' }}>{partner}</Text>
      </View>
      <Text style={{ color: theme.colors.textSecondary, fontSize: 14 }}>{offer}</Text>
      <Text style={{ color: theme.colors.accent, marginTop: 12, fontWeight: '600' }}>{points} pts</Text>
    </Pressable>
  );
};

export default BenefitCard;
