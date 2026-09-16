import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useEvents } from '../../contexts/EventsContext';
import { colors } from '../../constants/theme';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getEventById, toggleJoin } = useEvents();

  const event = getEventById(id);

  if (!event) {
    return (
      <View style={styles.notFoundContainer}>
        <Stack.Screen options={{ title: 'Event Not Found' }} />
        <Text style={styles.notFoundTitle}>Event Not Found</Text>
        <Text style={styles.notFoundText}>
          We couldn't find an event matching id "{id}". It may have been removed.
        </Text>
        <Pressable
          style={({ pressed }) => [styles.actionButton, { opacity: pressed ? 0.8 : 1 }]}
          onPress={() => router.back()}
        >
          <Text style={styles.actionButtonText}>Go Back</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.secondaryButton, { opacity: pressed ? 0.8 : 1 }]}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.secondaryButtonText}>Go Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: event.title }} />

      <View style={styles.categoryPill}>
        <Text style={styles.categoryText}>{event.category}</Text>
      </View>

      <Text style={styles.title}>{event.title}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Date & Time</Text>
        <Text style={styles.infoValue}>
          {event.date} · {event.time}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Location</Text>
        <Text style={styles.infoValue}>{event.location}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Organizer</Text>
        <Text style={styles.infoValue}>{event.organizer}</Text>
      </View>

      <Text style={styles.descriptionHeader}>About this event</Text>
      <Text style={styles.description}>{event.description}</Text>

      <Pressable
        onPress={() => toggleJoin(event.id)}
        style={({ pressed }) => [
          styles.joinButton,
          event.isJoined ? styles.leaveButton : styles.joinButtonActive,
          { opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <Text style={styles.joinButtonText}>{event.isJoined ? 'Leave Event' : 'Join Event'}</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push(`/edit-event/${event.id}`)}
        style={({ pressed }) => [styles.editButton, { opacity: pressed ? 0.85 : 1 }]}
      >
        <Text style={styles.editButtonText}>Edit Event</Text>
      </Pressable>

      <Pressable style={({ pressed }) => [styles.backLink, { opacity: pressed ? 0.7 : 1 }]} onPress={() => router.back()}>
        <Text style={styles.backLinkText}>← Back</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 40 },
  categoryPill: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 12,
  },
  categoryText: { color: colors.white, fontSize: 12, fontWeight: '700' },
  title: { fontSize: 22, fontWeight: '700', color: colors.textPrimary, marginBottom: 16 },
  infoRow: { marginBottom: 12 },
  infoLabel: { fontSize: 12, color: colors.textMuted, fontWeight: '600', textTransform: 'uppercase' },
  infoValue: { fontSize: 15, color: colors.textPrimary, marginTop: 2 },
  descriptionHeader: { fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginTop: 16, marginBottom: 6 },
  description: { fontSize: 14, color: colors.textSecondary, lineHeight: 20 },
  joinButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  joinButtonActive: { backgroundColor: colors.primary },
  leaveButton: { backgroundColor: colors.error },
  joinButtonText: { color: colors.white, fontWeight: '700', fontSize: 15 },
  editButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  editButtonText: { color: colors.primary, fontWeight: '700', fontSize: 15 },
  backLink: { marginTop: 16, alignItems: 'center' },
  backLinkText: { color: colors.primary, fontWeight: '600', fontSize: 14 },
  notFoundContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundTitle: { fontSize: 20, fontWeight: '700', color: colors.textPrimary, marginBottom: 8 },
  notFoundText: { fontSize: 14, color: colors.textMuted, textAlign: 'center', marginBottom: 24 },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 12,
  },
  actionButtonText: { color: colors.white, fontWeight: '700' },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: { color: colors.textSecondary, fontWeight: '600' },
});
