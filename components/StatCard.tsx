import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { colors } from '../constants/theme';

interface StatCardProps {
  label: string;
  value: number | string;
  accentColor?: string;
}

// Reusable dashboard metric card. Same component renders three different
// stats on the Home screen purely through props.
export default function StatCard({ label, value, accentColor = colors.primary }: StatCardProps) {
  const { width } = useWindowDimensions();
  const isNarrow = width < 380;

  return (
    <View
      style={[
        styles.card,
        { borderLeftColor: accentColor, minWidth: isNarrow ? '100%' : '30%' },
      ]}
    >
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginRight: 12,
    borderLeftWidth: 4,
    flexGrow: 1,
    shadowColor: colors.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  label: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
  },
});
