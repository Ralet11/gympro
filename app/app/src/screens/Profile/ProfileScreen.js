import React from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import SectionHeader from '../../components/SectionHeader';
import NeumorphicCard from '../../components/NeumorphicCard';
import AccentToggle from '../../components/AccentToggle';
import MetricCard from '../../components/MetricCard';
import PrBadge from '../../components/PrBadge';

const profileRows = [
  { label: 'Email', value: 'valen@gympro.fit' },
  { label: 'Teléfono', value: '+54 11 5555 5555' },
];

const preferenceRows = [
  { label: 'Idioma', value: 'Español' },
  { label: 'Unidades', value: 'Kg / cm' },
  { label: 'Privacidad social', value: 'Amigos' },
];

const ProfileScreen = () => {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 120 }}
    >
      <NeumorphicCard>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: theme.colors.elevated,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Feather name="user" size={28} color={theme.colors.accent} />
          </View>
          <View style={{ marginLeft: 16 }}>
            <Text style={{ color: theme.colors.textPrimary, fontSize: 20, fontWeight: '600' }}>Valen Gimenez</Text>
            <Text style={{ color: theme.colors.textSecondary }}>Membresía mensual · Renueva 12 Jul</Text>
          </View>
        </View>
        <Pressable
          style={({ pressed }) => ({
            marginTop: 20,
            paddingVertical: 12,
            borderRadius: theme.shape.radiusLg,
            backgroundColor: theme.colors.accent,
            alignItems: 'center',
            transform: [{ scale: pressed ? 0.98 : 1 }],
          })}
        >
          <Text style={{ color: '#0B0B0F', fontWeight: '600' }}>Gestionar membresía</Text>
        </Pressable>
      </NeumorphicCard>

      <SectionHeader title="Datos personales" />
      <NeumorphicCard style={{ marginTop: 12 }}>
        {profileRows.map((row) => (
          <View key={row.label} style={{ marginBottom: 16 }}>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>{row.label}</Text>
            <Text style={{ color: theme.colors.textPrimary, fontSize: 16, marginTop: 4 }}>{row.value}</Text>
          </View>
        ))}
      </NeumorphicCard>

      <SectionHeader title="Preferencias" />
      <NeumorphicCard style={{ marginTop: 12 }}>
        {preferenceRows.map((row) => (
          <View key={row.label} style={{ marginBottom: 16 }}>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 12 }}>{row.label}</Text>
            <Text style={{ color: theme.colors.textPrimary, fontSize: 16, marginTop: 4 }}>{row.value}</Text>
          </View>
        ))}
        <AccentToggle />
      </NeumorphicCard>

      <SectionHeader title="Progreso rápido" />
      <MetricCard label="Peso" value="72.4 kg" trend="-0.8 kg · 30 días" />
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        <PrBadge label="Back squat" value="105 kg" />
      </View>

      <SectionHeader title="Objetivos" />
      <NeumorphicCard style={{ marginTop: 12 }}>
        <Text style={{ color: theme.colors.textPrimary, fontWeight: '600' }}>Prioridad</Text>
        <View style={{ marginTop: 16 }}>
          {[{ label: 'Ganar músculo', value: 0.7 }, { label: 'Bajar grasa', value: 0.6 }, { label: 'Resistencia', value: 0.4 }].map((goal) => (
            <View key={goal.label} style={{ marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: theme.colors.textSecondary }}>{goal.label}</Text>
                <Text style={{ color: theme.colors.textSecondary }}>{Math.round(goal.value * 100)}%</Text>
              </View>
              <View style={{ height: 8, borderRadius: 4, backgroundColor: theme.colors.elevated, marginTop: 8 }}>
                <View style={{ width: `${goal.value * 100}%`, height: '100%', backgroundColor: theme.colors.accent }} />
              </View>
            </View>
          ))}
        </View>
      </NeumorphicCard>

      <SectionHeader title="Integraciones & soporte" />
      <NeumorphicCard style={{ marginTop: 12 }}>
        {[{ label: 'Apple Health', icon: 'heart' }, { label: 'Google Fit', icon: 'activity' }, { label: 'Balanza inteligente', icon: 'smartphone' }].map((integration) => (
          <Pressable
            key={integration.label}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(255,255,255,0.04)',
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name={integration.icon} size={18} color={theme.colors.accent} />
              <Text style={{ color: theme.colors.textPrimary, marginLeft: 12 }}>{integration.label}</Text>
            </View>
            <Feather name="chevron-right" size={18} color={theme.colors.textSecondary} />
          </Pressable>
        ))}
        <Pressable
          style={({ pressed }) => ({
            marginTop: 12,
            paddingVertical: 12,
            borderRadius: theme.shape.radiusLg,
            backgroundColor: theme.colors.elevated,
            alignItems: 'center',
            transform: [{ scale: pressed ? 0.98 : 1 }],
          })}
        >
          <Text style={{ color: theme.colors.textSecondary }}>Abrir ticket · Ver estado</Text>
        </Pressable>
      </NeumorphicCard>
    </ScrollView>
  );
};

export default ProfileScreen;
