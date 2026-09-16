import { Link, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import StatCard from '../../components/StatCard';
import { colors } from '../../constants/theme';
import { useEvents } from '../../contexts/EventsContext';
import { useProfile } from '../../contexts/ProfileContext';

export default function HomeScreen() {
  const { events } = useEvents();
  const { fullName } = useProfile();
  const router = useRouter();

  const totalEvents = events.length;
  const joinedEvents = events.filter((e) => e.isJoined).length;
  const availableEvents = totalEvents - joinedEvents;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.appTitle}>EventMate</Text>
      <Text style={styles.welcome}>Welcome back, {fullName || 'Student'}</Text>
      <Text style={styles.subtitle}>All Events</Text>

      <View style={styles.statsRow}>
        <StatCard label="Total Events" value={totalEvents} accentColor={colors.primary} />
        <StatCard label="Joined" value={joinedEvents} accentColor="#059669" />
        <StatCard label="Available" value={availableEvents} accentColor="#D97706" />
      </View>

      <Pressable
        style={({ pressed }) => [styles.secondaryButton, { opacity: pressed ? 0.8 : 1 }]}
        onPress={() => router.push('/events')}
      >
        <Text style={styles.secondaryButtonText}>Browse All Events</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.secondaryButton, { opacity: pressed ? 0.8 : 1 }]}
        onPress={() => router.push('/add-event')}
      >
        <Text style={styles.secondaryButtonText}>+ Add New Event</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  appTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  welcome: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  browseButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  browseButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 15,
  },
});
