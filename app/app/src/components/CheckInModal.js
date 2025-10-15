import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

const CheckInModal = ({ visible, onClose }) => {
  const { theme } = useTheme();
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (!visible) return;
    setCountdown(30);
  }, [visible]);

  useEffect(() => {
    if (!visible || countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [visible, countdown]);

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.overlay,
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: theme.shape.radiusXl,
            padding: 24,
          }}
        >
          <View
            style={{
              borderWidth: 2,
              borderColor: theme.colors.accent,
              borderRadius: theme.shape.radiusXl,
              padding: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Feather name="camera" size={48} color={theme.colors.accent} />
            <Text style={{ color: theme.colors.textPrimary, marginTop: 16, fontSize: 18, fontWeight: '600' }}>
              Escaneá el QR de acceso
            </Text>
            <Text style={{ color: theme.colors.textSecondary, marginTop: 8, textAlign: 'center' }}>
              Tenés 10 min de ventana · Mostrá este token si el lector falla
            </Text>
          </View>
          <View
            style={{
              marginTop: 24,
              padding: 16,
              borderRadius: theme.shape.radiusLg,
              backgroundColor: theme.colors.elevated,
            }}
          >
            <Text style={{ color: theme.colors.textPrimary, fontWeight: '600', marginBottom: 8 }}>
              QR alternativo
            </Text>
            <Text style={{ color: theme.colors.textSecondary }}>Token dinámico · expira en {countdown}s</Text>
          </View>
          <Pressable
            onPress={onClose}
            style={({ pressed }) => ({
              marginTop: 24,
              paddingVertical: 14,
              borderRadius: theme.shape.radiusLg,
              backgroundColor: theme.colors.accent,
              alignItems: 'center',
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <Text style={{ color: '#0B0B0F', fontWeight: '600' }}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CheckInModal;
