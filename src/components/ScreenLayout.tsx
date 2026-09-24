import React from 'react';
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from './sharedStyles';

interface ScreenLayoutProps {
  children: React.ReactNode;
  variant?: 'card' | 'centered';
  cardStyle?: ViewStyle;
}

export default function ScreenLayout({
  children,
  variant = 'card',
  cardStyle,
}: ScreenLayoutProps) {
  if (variant === 'centered') {
    return (
      <SafeAreaView style={styles.centered}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.card, cardStyle]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    padding: 20,
  },
  centered: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.primaryDark,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
});
