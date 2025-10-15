import React, { useMemo, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import Chip from '../../components/Chip';

const goalOptions = ['Bajar grasa', 'Ganar músculo', 'Resistencia'];
const habitOptions = ['Entreno 3+ veces', 'Trabajo sedentario', 'Lesión reciente'];
const permissionOptions = ['Salud', 'Notificaciones', 'Cámara'];

const DotProgress = ({ total, active }) => {
  const { theme } = useTheme();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 32 }}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 6,
            backgroundColor: index === active ? theme.colors.accent : theme.colors.elevated,
          }}
        />
      ))}
    </View>
  );
};

const OnboardingFlow = ({ onComplete }) => {
  const { theme } = useTheme();
  const [step, setStep] = useState(0);
  const [goals, setGoals] = useState(['Ganar músculo']);
  const [habits, setHabits] = useState([]);
  const [permissions, setPermissions] = useState(['Notificaciones']);

  const steps = useMemo(
    () => [
      {
        title: 'Bienvenido a GymPro',
        description: 'Tu coach inteligente y agenda en un solo lugar.',
        content: (
          <View>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 16, marginBottom: 32 }}>
              Prepará tu experiencia personalizada.
            </Text>
            <Pressable
              onPress={() => setStep(1)}
              style={({ pressed }) => ({
                paddingVertical: 14,
                borderRadius: theme.shape.radiusLg,
                backgroundColor: theme.colors.accent,
                alignItems: 'center',
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
            >
              <Text style={{ color: '#0B0B0F', fontWeight: '600' }}>Empezar</Text>
            </Pressable>
          </View>
        ),
      },
      {
        title: '¿Cuál es tu objetivo principal?',
        description: 'Seleccioná uno o más para ajustar tu plan.',
        content: (
          <View>
            <View style={{ flexDirection: 'row', marginBottom: 32 }}>
              {goalOptions.map((goal) => (
                <Chip
                  key={goal}
                  label={goal}
                  selected={goals.includes(goal)}
                  onPress={() =>
                    setGoals((current) =>
                      current.includes(goal)
                        ? current.filter((item) => item !== goal)
                        : [...current, goal]
                    )
                  }
                />
              ))}
            </View>
            <PrimaryButton label="Continuar" onPress={() => setStep(2)} />
          </View>
        ),
      },
      {
        title: 'Hábitos y lesiones',
        description: 'Contanos qué debemos tener en cuenta.',
        content: (
          <View>
            {habitOptions.map((habit) => (
              <ToggleRow
                key={habit}
                label={habit}
                active={habits.includes(habit)}
                onToggle={() =>
                  setHabits((current) =>
                    current.includes(habit)
                      ? current.filter((item) => item !== habit)
                      : [...current, habit]
                  )
                }
              />
            ))}
            <PrimaryButton label="Continuar" onPress={() => setStep(3)} style={{ marginTop: 32 }} />
          </View>
        ),
      },
      {
        title: 'Permisos inteligentes',
        description: 'Activalos para potenciar tu experiencia.',
        content: (
          <View>
            {permissionOptions.map((permission) => (
              <ToggleRow
                key={permission}
                label={permission}
                active={permissions.includes(permission)}
                onToggle={() =>
                  setPermissions((current) =>
                    current.includes(permission)
                      ? current.filter((item) => item !== permission)
                      : [...current, permission]
                  )
                }
              />
            ))}
            <PrimaryButton
              label="Listo"
              onPress={() =>
                onComplete({ goals, habits, permissions })
              }
              style={{ marginTop: 32 }}
            />
          </View>
        ),
      },
    ],
    [goals, habits, onComplete, permissions, theme.colors.accent, theme.colors.textSecondary, theme.shape.radiusLg]
  );

  const currentStep = steps[step];

  return (
    <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 80 }}>
      <DotProgress total={steps.length} active={step} />
      <Text style={{ color: theme.colors.textPrimary, fontSize: 24, fontWeight: '600', marginBottom: 12 }}>
        {currentStep.title}
      </Text>
      <Text style={{ color: theme.colors.textSecondary, fontSize: 16, marginBottom: 24 }}>
        {currentStep.description}
      </Text>
      {currentStep.content}
    </View>
  );
};

const ToggleRow = ({ label, active, onToggle }) => {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      <Text style={{ color: theme.colors.textPrimary, fontSize: 16 }}>{label}</Text>
      <View
        style={{
          width: 48,
          height: 28,
          borderRadius: 14,
          backgroundColor: active ? theme.colors.accent : theme.colors.elevated,
          justifyContent: 'center',
          paddingHorizontal: 4,
        }}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: '#0B0B0F',
            alignSelf: active ? 'flex-end' : 'flex-start',
          }}
        />
      </View>
    </Pressable>
  );
};

const PrimaryButton = ({ label, onPress, style }) => {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ([
        {
          paddingVertical: 14,
          borderRadius: theme.shape.radiusLg,
          backgroundColor: theme.colors.accent,
          alignItems: 'center',
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        style,
      ])}
    >
      <Text style={{ color: '#0B0B0F', fontWeight: '600' }}>{label}</Text>
    </Pressable>
  );
};

export default OnboardingFlow;
