import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import HomeScreen from '../screens/Home/HomeScreen';
import ClassesScreen from '../screens/Classes/ClassesScreen';
import RoutineScreen from '../screens/Routine/RoutineScreen';
import BenefitsScreen from '../screens/Benefits/BenefitsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import CheckInModal from '../components/CheckInModal';

const tabs = [
  { key: 'Home', label: 'Home', icon: 'home' },
  { key: 'Clases', label: 'Clases', icon: 'calendar' },
  { key: 'Rutina', label: 'Rutina', icon: 'activity' },
  { key: 'Beneficios', label: 'Beneficios', icon: 'gift' },
  { key: 'Perfil', label: 'Perfil', icon: 'user' },
];

const AppNavigator = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('Home');
  const [checkInVisible, setCheckInVisible] = useState(false);

  const ScreenComponent = useMemo(() => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen onOpenRoutine={() => setActiveTab('Rutina')} />;
      case 'Clases':
        return <ClassesScreen />;
      case 'Rutina':
        return <RoutineScreen />;
      case 'Beneficios':
        return <BenefitsScreen />;
      case 'Perfil':
        return <ProfileScreen />;
      default:
        return <HomeScreen onOpenRoutine={() => setActiveTab('Rutina')} />;
    }
  }, [activeTab]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1 }}>{ScreenComponent}</View>
      <View style={[styles.bottomBar, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <Pressable
              key={tab.key}
              accessibilityLabel={tab.label}
              onPress={() => setActiveTab(tab.key)}
              style={({ pressed }) => ({
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Feather
                name={tab.icon}
                size={22}
                color={isActive ? theme.colors.accent : theme.colors.textSecondary}
              />
              <Text
                style={{
                  marginTop: 4,
                  color: isActive ? theme.colors.accent : theme.colors.textSecondary,
                  fontSize: 12,
                }}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Pressable
        onPress={() => setCheckInVisible(true)}
        style={({ pressed }) => ([
          styles.fab,
          {
            backgroundColor: theme.colors.accent,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          },
        ])}
      >
        <Feather name="camera" size={24} color="#0B0B0F" />
      </Pressable>
      <CheckInModal visible={checkInVisible} onClose={() => setCheckInVisible(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingBottom: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
});

export default AppNavigator;
