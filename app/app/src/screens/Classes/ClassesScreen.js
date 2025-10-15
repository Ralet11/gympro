import React, { useMemo, useState } from 'react';
import { ScrollView, View, Text, Pressable, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import TopTabs from '../../components/TopTabs';
import SessionCard from '../../components/SessionCard';
import EmptyState from '../../components/EmptyState';
import Chip from '../../components/Chip';

const filterChips = ['Centro', 'Palermo', 'Nordelta'];
const categoryChips = ['Fuerza', 'Funcional', 'Yoga', 'Cycling'];

const ClassesScreen = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('Descubrir');
  const [selectedFilters, setSelectedFilters] = useState(['Centro']);
  const [selectedCategory, setSelectedCategory] = useState('Fuerza');

  const sessions = useMemo(
    () => [
      { title: 'Power Lifting Club', coach: 'Ari', startTime: 'Hoy · 19:00', occupancy: 0.4, intensity: 'Alta' },
      { title: 'Mobility Flow', coach: 'Lau', startTime: 'Hoy · 20:00', occupancy: 0.7, intensity: 'Media' },
      { title: 'Cycling 45', coach: 'Mauro', startTime: 'Mañana · 7:30', occupancy: 0.9, intensity: 'Alta', status: 'Lista de espera' },
    ],
    []
  );

  const renderContent = () => {
    if (activeTab !== 'Descubrir') {
      return (
        <EmptyState
          icon="calendar"
          title={activeTab === 'Mi agenda' ? 'Aún no tenés reservas' : 'No hay favoritas todavía'}
          description={
            activeTab === 'Mi agenda'
              ? 'Reservá una clase para verla acá.'
              : 'Explorá y marcá con el corazón para guardar tus favoritas.'
          }
          action={
            <Pressable
              onPress={() => setActiveTab('Descubrir')}
              style={({ pressed }) => ({
                marginTop: 20,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: theme.shape.radiusLg,
                backgroundColor: theme.colors.accent,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
            >
              <Text style={{ color: '#0B0B0F', fontWeight: '600' }}>Explorar clases</Text>
            </Pressable>
          }
        />
      );
    }

    return sessions.map((session) => (
      <SessionCard key={session.title} {...session} />
    ));
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 120 }}
    >
      <TopTabs options={['Descubrir', 'Mi agenda', 'Favoritas']} active={activeTab} onChange={setActiveTab} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.elevated,
          borderRadius: theme.shape.radiusLg,
          paddingHorizontal: 16,
          marginBottom: 16,
        }}
      >
        <Feather name="search" size={18} color={theme.colors.textSecondary} />
        <TextInput
          placeholder="Buscar sede, coach o categoría"
          placeholderTextColor={theme.colors.textMuted}
          style={{ flex: 1, paddingVertical: 12, paddingHorizontal: 12, color: theme.colors.textPrimary }}
        />
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        {filterChips.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            selected={selectedFilters.includes(chip)}
            onPress={() =>
              setSelectedFilters((current) =>
                current.includes(chip)
                  ? current.filter((item) => item !== chip)
                  : [...current, chip]
              )
            }
          />
        ))}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 24 }}>
        {categoryChips.map((chip) => (
          <Chip key={chip} label={chip} selected={chip === selectedCategory} onPress={() => setSelectedCategory(chip)} />
        ))}
      </ScrollView>
      {renderContent()}
    </ScrollView>
  );
};

export default ClassesScreen;
