import React, { useState } from 'react';
import { ScrollView, View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import BenefitCard from '../../components/BenefitCard';
import SectionHeader from '../../components/SectionHeader';
import NeumorphicCard from '../../components/NeumorphicCard';
import EmptyState from '../../components/EmptyState';

const categories = ['Suplementos', 'Fisio', 'Ropa', 'Experiencias'];

const BenefitsScreen = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('Suplementos');
  const [saldo, setSaldo] = useState(420);

  const benefits = [
    { partner: 'FuelBar', offer: '15% en pre entrenamiento', points: '90 pts' },
    { partner: 'RecoveryLab', offer: 'Sesión crioterapia', points: '260 pts' },
    { partner: 'MoveWear', offer: '2x1 calzas compresión', points: '310 pts' },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 120 }}
    >
      <NeumorphicCard>
        <Text style={{ color: theme.colors.textSecondary }}>Saldo de puntos</Text>
        <Text style={{ color: theme.colors.textPrimary, fontSize: 32, fontWeight: '600', marginVertical: 8 }}>
          {saldo} pts
        </Text>
        <Text style={{ color: theme.colors.textSecondary }}>Tier · Black ⚡️</Text>
        <Pressable
          onPress={() => setSaldo((value) => value + 50)}
          style={({ pressed }) => ({
            marginTop: 16,
            paddingVertical: 12,
            borderRadius: theme.shape.radiusLg,
            backgroundColor: theme.colors.accent,
            alignItems: 'center',
            transform: [{ scale: pressed ? 0.98 : 1 }],
          })}
        >
          <Text style={{ color: '#0B0B0F', fontWeight: '600' }}>Sumar puntos</Text>
        </Pressable>
      </NeumorphicCard>
      <SectionHeader title="Categorías" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
        {categories.map((category) => (
          <Pressable
            key={category}
            onPress={() => setActiveCategory(category)}
            style={({ pressed }) => ({
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: theme.shape.radiusLg,
              backgroundColor: activeCategory === category ? theme.colors.accent : theme.colors.elevated,
              marginRight: 12,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <Text style={{ color: activeCategory === category ? '#0B0B0F' : theme.colors.textSecondary, fontWeight: '600' }}>
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <SectionHeader title="Recomendados" />
      {benefits.length === 0 ? (
        <EmptyState
          icon="moon"
          title="Vuelve el lunes ✦"
          description="Sin stock por ahora, volvemos a reponer pronto."
        />
      ) : (
        benefits.map((benefit) => <BenefitCard key={benefit.partner} {...benefit} />)
      )}
      <SectionHeader title="Marketplace" />
      <NeumorphicCard>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Feather name="map-pin" size={20} color={theme.colors.accent} />
          <Text style={{ color: theme.colors.textSecondary, marginLeft: 8 }}>Partner cercano: Sede Centro (200m)</Text>
        </View>
        <Text style={{ color: theme.colors.textPrimary, marginTop: 16, fontSize: 18, fontWeight: '600' }}>
          Reserva tu sesión de fisio
        </Text>
        <Text style={{ color: theme.colors.textSecondary, marginTop: 8 }}>
          Cancelá sin penalidad hasta 3h antes.
        </Text>
      </NeumorphicCard>
    </ScrollView>
  );
};

export default BenefitsScreen;
