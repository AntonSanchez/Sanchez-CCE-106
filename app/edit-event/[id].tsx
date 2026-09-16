import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useEvents } from '../../contexts/EventsContext';
import { EventCategory } from '../../types/event';
import { validateDate, validateTime, normalizeTime } from '../../utils/validation';
import Toast from '../../components/Toast';
import { colors } from '../../constants/theme';

const CATEGORIES: EventCategory[] = ['Academic', 'Sports', 'Cultural', 'Workshop', 'Social'];

export default function EditEventScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getEventById, updateEvent } = useEvents();

  const event = getEventById(id);

  // All hooks must run unconditionally on every render, so they're declared
  // here (seeded from the event when it exists) before the not-found return.
  const [title, setTitle] = useState(event?.title ?? '');
  const [category, setCategory] = useState<EventCategory>(event?.category ?? 'Academic');
  const [date, setDate] = useState(event?.date ?? '');
  const [time, setTime] = useState(event && event.time !== 'TBA' ? event.time : '');
  const [location, setLocation] = useState(event?.location ?? '');
  const [organizer, setOrganizer] = useState(event?.organizer ?? '');
  const [description, setDescription] = useState(event?.description ?? '');

  const [errors, setErrors] = useState<{
    title?: string;
    date?: string;
    time?: string;
    location?: string;
  }>({});
  const [isPressed, setIsPressed] = useState(false);
  const [showToast, setShowToast] = useState(false);

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
      </View>
    );
  }

  const validate = () => {
    const nextErrors: typeof errors = {};
    if (title.trim().length === 0) nextErrors.title = 'Event title is required.';

    const dateError = validateDate(date);
    if (dateError) nextErrors.date = dateError;

    const timeError = validateTime(time);
    if (timeError) nextErrors.time = timeError;

    if (location.trim().length === 0) nextErrors.location = 'Location is required.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    updateEvent(event.id, {
      title: title.trim(),
      category,
      date: date.trim(),
      time: time.trim() ? normalizeTime(time) : 'TBA',
      location: location.trim(),
      organizer: organizer.trim() || 'You',
      description: description.trim() || 'No description provided.',
    });

    // Show a brief confirmation, then return to the event's detail screen
    // so the student sees the update.
    setShowToast(true);
    setTimeout(() => {
      router.replace(`/event/${event.id}`);
    }, 900);
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Stack.Screen options={{ title: 'Edit Event' }} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Edit Event</Text>
        <Text style={styles.subtitle}>Fields marked * are required.</Text>

        <Text style={styles.label}>Event Title *</Text>
        <TextInput
          placeholderTextColor={colors.textMuted}
          style={[styles.input, errors.title && styles.inputError]}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
          }}
          placeholder="e.g. Coding Bootcamp Kickoff"
        />
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

        <Text style={styles.label}>Category</Text>
        <View style={styles.chipRow}>
          {CATEGORIES.map((option) => {
            const isActive = category === option;
            return (
              <Pressable
                key={option}
                onPress={() => setCategory(option)}
                style={({ pressed }) => [
                  styles.chip,
                  isActive && styles.chipActive,
                  { opacity: pressed ? 0.8 : 1 },
                ]}
              >
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{option}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Date *</Text>
            <TextInput
          placeholderTextColor={colors.textMuted}
              style={[styles.input, errors.date && styles.inputError]}
              value={date}
              onChangeText={(text) => {
                setDate(text);
                if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }));
              }}
              placeholder="e.g. Oct 10, 2026"
            />
            {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Time</Text>
            <TextInput
          placeholderTextColor={colors.textMuted}
              style={[styles.input, errors.time && styles.inputError]}
              value={time}
              onChangeText={(text) => {
                setTime(text);
                if (errors.time) setErrors((prev) => ({ ...prev, time: undefined }));
              }}
              placeholder="e.g. 3:00 PM"
            />
            {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}
          </View>
        </View>

        <Text style={styles.label}>Location *</Text>
        <TextInput
          placeholderTextColor={colors.textMuted}
          style={[styles.input, errors.location && styles.inputError]}
          value={location}
          onChangeText={(text) => {
            setLocation(text);
            if (errors.location) setErrors((prev) => ({ ...prev, location: undefined }));
          }}
          placeholder="e.g. Student Center, Room 101"
        />
        {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

        <Text style={styles.label}>Organizer</Text>
        <TextInput
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          value={organizer}
          onChangeText={setOrganizer}
          placeholder="e.g. Student Council"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholderTextColor={colors.textMuted}
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="What should students expect?"
          multiline
          numberOfLines={4}
        />

        <Pressable
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={handleSave}
          style={[styles.createButton, isPressed && styles.createButtonPressed]}
        >
          <Text style={styles.createButtonText}>Save Changes</Text>
        </Pressable>

        <Pressable style={({ pressed }) => [styles.cancelButton, { opacity: pressed ? 0.7 : 1 }]} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
      </ScrollView>

      <Toast
        visible={showToast}
        message="Event updated!"
        onHide={() => setShowToast(false)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 48 },
  header: { fontSize: 22, fontWeight: '700', color: colors.textPrimary },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: 4, marginBottom: 12 },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textPrimary,
  },
  inputError: {
    borderColor: colors.error,
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  errorText: {
    color: colors.error,
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rowItem: {
    width: '48%',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.white,
  },
  createButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  createButtonPressed: {
    backgroundColor: colors.primaryPressed,
  },
  createButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  cancelButton: {
    alignItems: 'center',
    marginTop: 14,
  },
  cancelButtonText: {
    color: colors.textMuted,
    fontWeight: '600',
    fontSize: 14,
  },
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
});
