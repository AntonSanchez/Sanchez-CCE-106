import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { findCourseById } from '../data';
import { useTheme } from '../theme';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const course = findCourseById(id);
  const { colors, isDark } = useTheme();

  if (!course) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ title: 'Course Not Found' }} />
        <Ionicons name="alert-circle-outline" size={48} color={colors.danger} />
        <Text style={[styles.errorTitle, { color: colors.text }]}>Course not found</Text>
        <Text style={[styles.errorSubtitle, { color: colors.subtleText }]}>
          No course exists with id "{id}". It may have been removed.
        </Text>
        <Pressable
          style={[styles.backButton, { borderColor: colors.border }]}
          onPress={() => router.back()}
        >
          <Text style={[styles.backButtonText, { color: colors.text }]}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ title: course.title }} />

      <Text style={[styles.title, { color: colors.text }]}>{course.title}</Text>
      <Text style={[styles.instructor, { color: colors.subtleText }]}>{course.instructor}</Text>

      <View style={styles.metaRow}>
        <View style={[styles.metaPill, { backgroundColor: isDark ? '#1e3a5f' : '#eff6ff' }]}>
          <Text style={[styles.metaPillText, { color: colors.primary }]}>
            {course.credits} credits
          </Text>
        </View>
        <View style={[styles.metaPill, { backgroundColor: isDark ? '#1e3a5f' : '#eff6ff' }]}>
          <Text style={[styles.metaPillText, { color: colors.primary }]}>{course.schedule}</Text>
        </View>
      </View>

      <Text style={[styles.sectionLabel, { color: colors.subtleText }]}>Description</Text>
      <Text style={[styles.description, { color: colors.text }]}>{course.description}</Text>

      <Pressable
        style={[styles.backButtonSolid, { backgroundColor: colors.primary }]}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={18} color={colors.primaryText} />
        <Text style={[styles.backButtonSolidText, { color: colors.primaryText }]}>
          Back to Home
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '700' },
  instructor: { fontSize: 14, marginTop: 4, marginBottom: 16 },
  metaRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginBottom: 20 },
  metaPill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  metaPillText: { fontSize: 12, fontWeight: '600' },
  sectionLabel: { fontSize: 13, fontWeight: '700', marginBottom: 6 },
  description: { fontSize: 15, lineHeight: 22, marginBottom: 30 },
  backButtonSolid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    paddingVertical: 12,
  },
  backButtonSolidText: { fontWeight: '600' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 6 },
  errorTitle: { fontSize: 18, fontWeight: '700', marginTop: 8 },
  errorSubtitle: { fontSize: 13, textAlign: 'center', marginBottom: 16 },
  backButton: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10 },
  backButtonText: { fontWeight: '600' },
});
