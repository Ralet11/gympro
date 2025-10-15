import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { accentPresets } from '../theme/tokens';

const AccentToggle = () => {
  const { theme, accent, setAccent } = useTheme();

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ color: theme.colors.textSecondary, marginBottom: 12 }}>Color de acento</Text>
      <View style={{ flexDirection: 'row' }}>
        {Object.entries(accentPresets).map(([key, value]) => {
          const isActive = accent === key;
          return (
            <Pressable
              key={key}
              onPress={() => setAccent(key)}
              style={({ pressed }) => ({
                width: 44,
                height: 44,
                borderRadius: 22,
                marginRight: 12,
                backgroundColor: value,
                borderWidth: isActive ? 3 : 0,
                borderColor: theme.colors.textPrimary,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              })}
            />
          );
        })}
      </View>
    </View>
  );
};

export default AccentToggle;
