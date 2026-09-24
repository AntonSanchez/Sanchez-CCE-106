import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import { sharedStyles, Colors } from '../components/sharedStyles';

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({
  message = 'Checking for a saved session…',
}: LoadingScreenProps) {
  return (
    <ScreenLayout variant="centered">
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={sharedStyles.helperText}>{message}</Text>
    </ScreenLayout>
  );
}
