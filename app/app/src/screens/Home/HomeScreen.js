import React, { useCallback, useState } from 'react';
import { ScrollView, RefreshControl, View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import HeroBanner from '../../components/HeroBanner';
import SectionHeader from '../../components/SectionHeader';
import NeumorphicCard from '../../components/NeumorphicCard';
import HeatStrip from '../../components/HeatStrip';
import BenefitCard from '../../components/BenefitCard';
import Chip from '../../components/Chip';

const HomeScreen = ({ onOpenRoutine }) => {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [checkInWindow, setCheckInWindow] = useState(true);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 900);
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 120 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.accent} />}
    >
      <HeroBanner
        badge="Membresía activa"
        title="Hola, Valen 👋"
        subtitle="Streak: 5 días. ¡No lo rompas!"
        icon="heart"
      />

      <SectionHeader title="Próxima clase" actionLabel="Ver agenda" />
      <NeumorphicCard>
        <Text style={{ color: theme.colors.textPrimary, fontSize: 18, fontWeight: '600' }}>Funcional HIIT</Text>
        <Text style={{ color: theme.colors.textSecondary, marginTop: 4 }}>Hoy · 18:30 · Coach Sofi</Text>
        <View style={{ flexDirection: 'row', marginTop: 16, alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: theme.colors.textSecondary }}>Sala 2 · Aforo 60%</Text>
          {checkInWindow ? (
            <Pressable
              onPress={() => setCheckInWindow(false)}
              style={({ pressed }) => ({
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: theme.shape.radiusLg,
                backgroundColor: theme.colors.accent,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
            >
              <Text style={{ color: '#0B0B0F', fontWeight: '600' }}>Check-in rápido</Text>
            </Pressable>
          ) : (
            <Text style={{ color: theme.colors.success, fontWeight: '600' }}>Registrado ✓</Text>
          )}
        </View>
      </NeumorphicCard>

      <SectionHeader title="Ocupación" actionLabel="Ver mapa" />
      <HeatStrip
        data={[
          { label: '7h', value: 0.3 },
          { label: '9h', value: 0.5 },
          { label: '12h', value: 0.85 },
          { label: '15h', value: 0.4, best: true },
          { label: '18h', value: 0.9 },
          { label: '21h', value: 0.6 },
        ]}
      />
      <View style={{ flexDirection: 'row', marginTop: 16 }}>
        {['Ir ahora', 'En 30’', 'En 2 h'].map((chip) => (
          <Chip key={chip} label={chip} selected={chip === 'Ir ahora'} />
        ))}
      </View>

      <SectionHeader title="Rutina de hoy" actionLabel="Ver rutina completa" onAction={onOpenRoutine} />
      <NeumorphicCard style={{ marginTop: 12 }}>
        {[{ name: 'Sentadilla frontal', reps: '4 x 6–8 · RPE 7' }, { name: 'Remo con barra', reps: '3 x 8 · RIR 2' }, { name: 'Plancha hollow', reps: '3 x 40"' }].map((exercise) => (
          <View key={exercise.name} style={{ marginBottom: 16 }}>
            <Text style={{ color: theme.colors.textPrimary, fontWeight: '600' }}>{exercise.name}</Text>
            <Text style={{ color: theme.colors.textSecondary, marginTop: 4 }}>{exercise.reps}</Text>
          </View>
        ))}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Pressable
            onPress={onOpenRoutine}
            style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', transform: [{ scale: pressed ? 0.98 : 1 }] })}
          >
            <Text style={{ color: theme.colors.accent, marginRight: 8, fontWeight: '600' }}>Comenzar</Text>
            <Feather name="play" size={16} color={theme.colors.accent} />
          </Pressable>
          <Text style={{ color: theme.colors.textSecondary }}>Duración estimada: 42’</Text>
        </View>
      </NeumorphicCard>

      <SectionHeader title="Beneficio destacado" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
        <BenefitCard partner="FuelBar" offer="Batido proteico 2x1" points="120" />
        <BenefitCard partner="Fisio+" offer="20% en sesiones" points="220" />
        <BenefitCard partner="MoveWear" offer="Kit outfit" points="450" />
      </ScrollView>
    </ScrollView>
  );
};

export default HomeScreen;
