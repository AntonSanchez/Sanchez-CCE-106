import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter, Stack, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { findStudentById, findCourseById } from '../data';
import { useTheme } from '../theme';

export default function StudentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const matchedStudent = findStudentById(id);
  const { colors } = useTheme();

  if (!matchedStudent) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ title: 'Student Not Found' }} />
        <Ionicons name="alert-circle-outline" size={48} color={colors.danger} />
        <Text style={[styles.errorTitle, { color: colors.text }]}>Student not found</Text>
        <Text style={[styles.errorSubtitle, { color: colors.subtleText }]}>
          No student record matches id "{id}".
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
      <Stack.Screen options={{ title: matchedStudent.name }} />

      <Text style={[styles.title, { color: colors.text }]}>{matchedStudent.name}</Text>
      <Text style={[styles.subtitle, { color: colors.subtleText }]}>
        {matchedStudent.program}
      </Text>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.rowLabel, { color: colors.subtleText }]}>Student ID</Text>
        <Text style={[styles.rowValue, { color: colors.text }]}>{matchedStudent.id}</Text>
        <Text style={[styles.rowLabel, { color: colors.subtleText }]}>Year</Text>
        <Text style={[styles.rowValue, { color: colors.text }]}>{matchedStudent.year}</Text>
        <Text style={[styles.rowLabel, { color: colors.subtleText }]}>Email</Text>
        <Text style={[styles.rowValue, { color: colors.text }]}>{matchedStudent.email}</Text>
        <Text style={[styles.rowLabel, { color: colors.subtleText }]}>GPA</Text>
        <Text style={[styles.rowValue, { color: colors.text }]}>{matchedStudent.gpa}</Text>
      </View>

      <Text style={[styles.sectionLabel, { color: colors.subtleText }]}>Enrolled Courses</Text>
      {matchedStudent.enrolledCourseIds.map((courseId) => {
        const course = findCourseById(courseId);
        if (!course) return null;
        return (
          <Link
            key={courseId}
            href={`/course/${courseId}`}
            style={[styles.courseLink, { color: colors.primary }]}
          >
            • {course.title}
          </Link>
        );
      })}

      <Pressable
        style={[styles.backButtonSolid, { backgroundColor: colors.primary }]}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={18} color={colors.primaryText} />
        <Text style={[styles.backButtonSolidText, { color: colors.primaryText }]}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '700' },
  subtitle: { fontSize: 14, marginBottom: 16 },
  card: { borderRadius: 14, borderWidth: 1, padding: 16, marginBottom: 20, gap: 2 },
  rowLabel: { fontSize: 11, marginTop: 8 },
  rowValue: { fontSize: 15, fontWeight: '500' },
  sectionLabel: { fontSize: 13, fontWeight: '700', marginBottom: 8 },
  courseLink: { fontSize: 14, marginBottom: 8 },
  backButtonSolid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 24,
  },
  backButtonSolidText: { fontWeight: '600' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 6 },
  errorTitle: { fontSize: 18, fontWeight: '700', marginTop: 8 },
  errorSubtitle: { fontSize: 13, textAlign: 'center', marginBottom: 16 },
  backButton: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10 },
  backButtonText: { fontWeight: '600' },
});
