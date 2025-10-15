import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const SectionHeader = ({ title, actionLabel, onAction }) => {
  const { theme } = useTheme();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
      <Text style={{ color: theme.colors.textPrimary, fontSize: 18, fontWeight: '600' }}>{title}</Text>
      {actionLabel ? (
        <Pressable onPress={onAction} style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', opacity: pressed ? 0.8 : 1 })}>
          <Text style={{ color: theme.colors.accent, marginRight: 6 }}>{actionLabel}</Text>
          <Feather name="arrow-right" size={16} color={theme.colors.accent} />
        </Pressable>
      ) : null}
    </View>
  );
};

export default SectionHeader;
