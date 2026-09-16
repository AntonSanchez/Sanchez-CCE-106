import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import EventCard from '../../components/EventCard';
import { useEvents } from '../../contexts/EventsContext';
import { colors } from '../../constants/theme';

type FilterOption = 'All' | 'Joined' | 'Not Joined';

const FILTERS: FilterOption[] = ['All', 'Joined', 'Not Joined'];

export default function EventsScreen() {
  const { events } = useEvents();
  const router = useRouter();
  const [filter, setFilter] = useState<FilterOption>('All');

  // Visible list changes whenever the useState-backed filter changes.
  const filteredEvents = useMemo(() => {
    if (filter === 'Joined') return events.filter((e) => e.isJoined);
    if (filter === 'Not Joined') return events.filter((e) => !e.isJoined);
    return events;
  }, [events, filter]);

  const handleSelect = (id: string) => {
    router.push(`/event/${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Campus Events</Text>

      <View style={styles.filterRow}>
        {FILTERS.map((option) => {
          const isActive = filter === option;
          return (
            <Pressable
              key={option}
              onPress={() => setFilter(option)}
              style={({ pressed }) => [
                styles.filterChip,
                isActive && styles.filterChipActive,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{option}</Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} onPress={handleSelect} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No events match this filter.</Text>}
      />

      <Pressable
        onPress={() => router.push('/add-event')}
        style={({ pressed }) => [styles.fab, { opacity: pressed ? 0.85 : 1 }]}
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  filterTextActive: {
    color: colors.white,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textMuted,
    marginTop: 40,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  fabText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '600',
    marginTop: -2,
  },
});
