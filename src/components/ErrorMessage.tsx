import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../app/theme';

export default function ErrorMessage({ message }: { message?: string | null }) {
  const { colors, isDark } = useTheme();
  if (!message) return null;
  return (
    <View
      style={[
        styles.box,
        { backgroundColor: isDark ? '#3f1d1d' : '#FEE2E2', borderColor: colors.danger },
      ]}
    >
      <Text style={[styles.text, { color: colors.danger }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 12 },
  text: { fontSize: 13 },
});
