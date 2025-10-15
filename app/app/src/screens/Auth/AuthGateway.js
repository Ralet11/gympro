import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import Chip from '../../components/Chip';

const socialProviders = [
  { label: 'Continuar con Apple', icon: 'apple' },
  { label: 'Continuar con Google', icon: 'globe' },
];

const AuthGateway = ({ onAuthenticated }) => {
  const { theme } = useTheme();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('socio@gympro.fit');
  const [password, setPassword] = useState('••••••••');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email.includes('@')) {
      setError('Revisá tu email, parece inválido.');
      return;
    }
    setError('');
    onAuthenticated?.();
  };

  return (
    <View style={{ flex: 1, padding: 24, justifyContent: 'center' }}>
      <View style={{ marginBottom: 32 }}>
        <Text style={{ color: theme.colors.textPrimary, fontSize: 28, fontWeight: '600' }}>
          {mode === 'login' ? 'Iniciá sesión' : 'Creá tu cuenta'}
        </Text>
        <Text style={{ color: theme.colors.textSecondary, marginTop: 8 }}>
          Accedé a tus rutinas, reservas y progreso.
        </Text>
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 24 }}>
        <Chip label="Ingresar" selected={mode === 'login'} onPress={() => setMode('login')} />
        <Chip label="Registrar" selected={mode === 'register'} onPress={() => setMode('register')} />
      </View>
      {socialProviders.map((provider) => (
        <Pressable
          key={provider.label}
          onPress={handleSubmit}
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 14,
            paddingHorizontal: 16,
            borderRadius: theme.shape.radiusLg,
            backgroundColor: theme.colors.elevated,
            marginBottom: 12,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          })}
        >
          <Feather name={provider.icon} size={20} color={theme.colors.textPrimary} />
          <Text style={{ color: theme.colors.textPrimary, marginLeft: 12, fontWeight: '600' }}>
            {provider.label}
          </Text>
        </Pressable>
      ))}
      <View style={{ marginTop: 24 }}>
        <Text style={{ color: theme.colors.textSecondary, marginBottom: 8 }}>o con tu email</Text>
        <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Field label="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
        {error ? <Text style={{ color: theme.colors.error, marginTop: 12 }}>{error}</Text> : null}
        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => ({
            marginTop: 24,
            paddingVertical: 14,
            borderRadius: theme.shape.radiusLg,
            backgroundColor: theme.colors.accent,
            alignItems: 'center',
            transform: [{ scale: pressed ? 0.98 : 1 }],
          })}
        >
          <Text style={{ color: '#0B0B0F', fontWeight: '600' }}>
            {mode === 'login' ? 'Ingresar' : 'Crear cuenta'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const Field = ({ label, ...props }) => {
  const { theme } = useTheme();
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ color: theme.colors.textSecondary, marginBottom: 8 }}>{label}</Text>
      <TextInput
        {...props}
        style={{
          height: 52,
          borderRadius: theme.shape.radiusLg,
          backgroundColor: theme.colors.surface,
          paddingHorizontal: 16,
          color: theme.colors.textPrimary,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.06)',
        }}
        placeholderTextColor={theme.colors.textMuted}
      />
    </View>
  );
};

export default AuthGateway;
