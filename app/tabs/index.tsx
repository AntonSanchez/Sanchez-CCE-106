import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { courses, student } from '../data';
import { useTheme } from '../theme';

export default function HomeScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.welcome, { color: colors.text }]}>
        Welcome back, {student.name.split(' ')[0]} 
      </Text>
      <Text style={[styles.subtitle, { color: colors.subtleText }]}>
        You are Good.
      </Text>

      <View
        style={[
          styles.summaryCard,
          { backgroundColor: isDark ? '#1e3a5f' : '#eff6ff' },
        ]}
      >
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: colors.primary }]}>{courses.length}</Text>
          <Text style={[styles.summaryLabel, { color: colors.subtleText }]}>Enrolled Courses</Text>
        </View>
        <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: colors.primary }]}>{student.gpa}</Text>
          <Text style={[styles.summaryLabel, { color: colors.subtleText }]}>Current GPA</Text>
        </View>
        <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: colors.primary }]}>{student.year}</Text>
          <Text style={[styles.summaryLabel, { color: colors.subtleText }]}>Standing</Text>
        </View>
      </View>

      <Pressable
        style={[styles.profileButton, { backgroundColor: colors.primary }]}
        onPress={() => router.push(`/student/${student.id}`)}
      >
        <Ionicons name="person-circle-outline" size={20} color={colors.primaryText} />
        <Text style={[styles.profileButtonText, { color: colors.primaryText }]}>
          View my full student record
        </Text>
      </Pressable>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Your Courses</Text>
      {courses.map((course) => (
        <Link key={course.id} href={`/course/${course.id}`} asChild>
          <Pressable
            style={[
              styles.courseCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.courseTitle, { color: colors.text }]}>{course.title}</Text>
              <Text style={[styles.courseMeta, { color: colors.subtleText }]}>
                {course.instructor} · {course.credits} credits
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.subtleText} />
          </Pressable>
        </Link>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40, gap: 12 },
  welcome: { fontSize: 24, fontWeight: '700' },
  subtitle: { fontSize: 14, marginBottom: 8 },
  summaryCard: { flexDirection: 'row', borderRadius: 16, paddingVertical: 16, marginBottom: 4 },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: { fontSize: 18, fontWeight: '700' },
  summaryLabel: { fontSize: 12, marginTop: 4, textAlign: 'center' },
  summaryDivider: { width: 1 },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    paddingVertical: 12,
  },
  profileButtonText: { fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginTop: 16 },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
  },
  courseTitle: { fontSize: 15, fontWeight: '600' },
  courseMeta: { fontSize: 12, marginTop: 2 },
  invalidLink: { fontSize: 13, marginTop: 8, textAlign: 'center' },
});
