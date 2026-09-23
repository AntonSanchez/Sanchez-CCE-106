import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../app/theme';

export default function LoadingScreen({ label = 'Loading...' }: { label?: string }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={[styles.label, { color: colors.subtleText }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  label: { marginTop: 12, fontSize: 14 },
});
