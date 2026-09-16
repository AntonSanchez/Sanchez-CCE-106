import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CampusEvent } from '../types/event';
import { colors } from '../constants/theme';

interface EventCardProps {
  event: CampusEvent;
  onPress: (id: string) => void;
}

const categoryColors: Record<string, string> = {
  Academic: colors.primary,
  Sports: '#EA580C',
  Cultural: '#DB2777',
  Workshop: '#059669',
  Social: '#D97706',
};

// Reusable row/card for the Events list. Receives all data through props.
export default function EventCard({ event, onPress }: EventCardProps) {
  const accent = categoryColors[event.category] ?? colors.primary;

  return (
    <Pressable
      onPress={() => onPress(event.id)}
      style={({ pressed }) => [
        styles.card,
        { borderLeftColor: accent, opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={2}>
          {event.title}
        </Text>
        {event.isJoined && (
          <View style={styles.joinedBadge}>
            <Text style={styles.joinedBadgeText}>Joined</Text>
          </View>
        )}
      </View>
      <Text style={styles.meta}>
        {event.date} · {event.time}
      </Text>
      <Text style={styles.meta}>{event.location}</Text>
      <View style={[styles.categoryPill, { backgroundColor: accent }]}>
        <Text style={styles.categoryText}>{event.category}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: colors.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  joinedBadge: {
    backgroundColor: colors.successBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  joinedBadgeText: {
    color: colors.successText,
    fontSize: 11,
    fontWeight: '700',
  },
  meta: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 8,
  },
  categoryText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '600',
  },
});
