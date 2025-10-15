import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView } from 'react-native';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import OnboardingFlow from './src/screens/Onboarding/OnboardingFlow';
import AuthGateway from './src/screens/Auth/AuthGateway';
import AppNavigator from './src/navigation/AppNavigator';

const Shell = ({ onboardingData, onCompleteOnboarding, onAuthenticated, authenticated }) => {
  const { theme } = useTheme();

  if (!onboardingData) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <OnboardingFlow onComplete={onCompleteOnboarding} />
      </View>
    );
  }

  if (!authenticated) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <AuthGateway onAuthenticated={onAuthenticated} />
      </View>
    );
  }

  return <AppNavigator />;
};

const AppContent = () => {
  const [onboardingData, setOnboardingData] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const handleOnboardingComplete = (data) => {
    setOnboardingData(data);
  };

  return (
    <ThemeProvider>
      <StatusBar style="light" />
      <Shell
        onboardingData={onboardingData}
        onCompleteOnboarding={handleOnboardingComplete}
        onAuthenticated={() => setAuthenticated(true)}
        authenticated={authenticated}
      />
    </ThemeProvider>
  );
};

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppContent />
    </SafeAreaView>
  );
}
