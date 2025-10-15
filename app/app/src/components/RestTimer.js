import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const RestTimer = ({ seconds = 60 }) => {
  const { theme } = useTheme();
  const [remaining, setRemaining] = useState(seconds);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active || remaining <= 0) return;
    const interval = setInterval(() => {
      setRemaining((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [active, remaining]);

  return (
    <Pressable
      onPress={() => {
        if (remaining === 0) {
          setRemaining(seconds);
        }
        setActive((prev) => !prev);
      }}
      style={({ pressed }) => ({
        padding: 16,
        borderRadius: 18,
        backgroundColor: theme.colors.elevated,
        alignItems: 'center',
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          borderWidth: 6,
          borderColor: theme.colors.accent,
          opacity: 0.9,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: theme.colors.textPrimary, fontWeight: '600', fontSize: 16 }}>
          {remaining}s
        </Text>
      </View>
      <Text style={{ color: theme.colors.textSecondary, marginTop: 12 }}>
        {active ? 'Pausar' : remaining === 0 ? 'Reiniciar' : 'Iniciar descanso'}
      </Text>
    </Pressable>
  );
};

export default RestTimer;
