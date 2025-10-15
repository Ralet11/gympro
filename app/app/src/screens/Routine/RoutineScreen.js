import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import TopTabs from '../../components/TopTabs';
import RpeDial from '../../components/RpeDial';
import RestTimer from '../../components/RestTimer';
import SectionHeader from '../../components/SectionHeader';
import NeumorphicCard from '../../components/NeumorphicCard';

const blocks = [
  {
    title: 'Bloque A · Fuerza',
    exercises: [
      { name: 'Sentadilla frontal', series: 4, total: 4, rpe: 7, notes: 'Mantené la técnica. Si duele, frená.' },
      { name: 'Press banca inclinado', series: 4, total: 4, rpe: 6, notes: 'Controlá la negativa (3s).' },
    ],
  },
  {
    title: 'Bloque B · Potencia',
    exercises: [
      { name: 'Kettlebell swing', series: 3, total: 3, rpe: 8 },
      { name: 'Sled push', series: 3, total: 3, rpe: 7 },
    ],
  },
];

const RoutineScreen = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('Hoy');
  const [rpeValues, setRpeValues] = useState({ 'Sentadilla frontal': 7 });

  if (activeTab !== 'Hoy') {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        contentContainerStyle={{ padding: 24 }}
      >
        <SectionHeader
          title={activeTab === 'Semana' ? 'Plan semanal' : 'Historial'}
          actionLabel={activeTab === 'Semana' ? 'Ver calendario' : undefined}
        />
        <Text style={{ color: theme.colors.textSecondary, marginTop: 16 }}>
          Próximamente verás tu progreso consolidado acá.
        </Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 120 }}
    >
      <TopTabs options={['Hoy', 'Semana', 'Historial']} active={activeTab} onChange={setActiveTab} />
      {blocks.map((block) => (
        <View key={block.title} style={{ marginTop: 16 }}>
          <Text style={{ color: theme.colors.textSecondary, marginBottom: 8 }}>{block.title}</Text>
          <NeumorphicCard>
            {block.exercises.map((exercise, index) => (
              <View key={exercise.name} style={{ marginBottom: index === block.exercises.length - 1 ? 0 : 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flex: 1, paddingRight: 12 }}>
                    <Text style={{ color: theme.colors.textPrimary, fontSize: 18, fontWeight: '600' }}>
                      {exercise.name}
                    </Text>
                    <Text style={{ color: theme.colors.textSecondary, marginTop: 4 }}>
                      Serie {exercise.series}/{exercise.total} · RPE objetivo {exercise.rpe}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() =>
                      setRpeValues((current) => ({
                        ...current,
                        [exercise.name]: Math.min((current[exercise.name] ?? exercise.rpe) + 1, 10),
                      }))
                    }
                    style={({ pressed }) => ({
                      width: 42,
                      height: 42,
                      borderRadius: 21,
                      backgroundColor: theme.colors.elevated,
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: [{ scale: pressed ? 0.95 : 1 }],
                    })}
                  >
                    <Feather name="plus" size={18} color={theme.colors.textSecondary} />
                  </Pressable>
                </View>
                <View style={{ marginTop: 16 }}>
                  <RpeDial
                    value={rpeValues[exercise.name] ?? exercise.rpe}
                    onChange={(value) =>
                      setRpeValues((current) => ({
                        ...current,
                        [exercise.name]: value,
                      }))
                    }
                  />
                  {rpeValues[exercise.name] >= 8 ? (
                    <View
                      style={{
                        marginTop: 12,
                        padding: 12,
                        borderRadius: theme.shape.radiusLg,
                        backgroundColor: 'rgba(245,196,0,0.12)',
                      }}
                    >
                      <Text style={{ color: theme.colors.warning, fontWeight: '600' }}>
                        Sugerencia: bajá 5%
                      </Text>
                    </View>
                  ) : null}
                  {exercise.notes ? (
                    <Text style={{ color: theme.colors.textSecondary, marginTop: 12 }}>{exercise.notes}</Text>
                  ) : null}
                </View>
              </View>
            ))}
            <View style={{ marginTop: 24, alignItems: 'center' }}>
              <RestTimer seconds={75} />
            </View>
          </NeumorphicCard>
        </View>
      ))}
      <NeumorphicCard style={{ marginTop: 24 }}>
        <Text style={{ color: theme.colors.textPrimary, fontSize: 18, fontWeight: '600' }}>Fin de sesión</Text>
        <Text style={{ color: theme.colors.textSecondary, marginTop: 8 }}>
          Volumen total 12.3k kg · 2 PRs · 480 kcal
        </Text>
        <Pressable
          style={({ pressed }) => ({
            marginTop: 16,
            paddingVertical: 12,
            borderRadius: theme.shape.radiusLg,
            backgroundColor: theme.colors.accent,
            alignItems: 'center',
            transform: [{ scale: pressed ? 0.98 : 1 }],
          })}
        >
          <Text style={{ color: '#0B0B0F', fontWeight: '600' }}>Compartir progreso</Text>
        </Pressable>
      </NeumorphicCard>
    </ScrollView>
  );
};

export default RoutineScreen;
