import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { student } from '../data';
import { useTheme, ThemeColors } from '../theme';

function InfoRow({
  icon,
  label,
  value,
  colors,
}: {
  icon: any;
  label: string;
  value: string;
  colors: ThemeColors;
}) {
  return (
    <View style={styles.row}>
      <Ionicons name={icon} size={18} color={colors.subtleText} style={{ width: 26 }} />
      <View>
        <Text style={[styles.rowLabel, { color: colors.subtleText }]}>{label}</Text>
        <Text style={[styles.rowValue, { color: colors.text }]}>{value}</Text>
      </View>
    </View>
  );
}

export default function ProfileScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
        <Text style={[styles.avatarText, { color: colors.primaryText }]}>
          {student.name.split(' ').map((n) => n[0]).join('')}
        </Text>
      </View>
      <Text style={[styles.name, { color: colors.text }]}>{student.name}</Text>
      <Text style={[styles.program, { color: colors.subtleText }]}>{student.program}</Text>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <InfoRow icon="id-card-outline" label="Student ID" value={student.id} colors={colors} />
        <InfoRow icon="school-outline" label="Year" value={student.year} colors={colors} />
        <InfoRow icon="mail-outline" label="Email" value={student.email} colors={colors} />
        <InfoRow icon="stats-chart-outline" label="GPA" value={student.gpa} colors={colors} />
      </View>

      <Link href={`/student/${student.id}`} style={[styles.linkButton, { color: colors.primary }]}>
        View Full Student Record →
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', paddingBottom: 40 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 24, fontWeight: '700' },
  name: { fontSize: 20, fontWeight: '700' },
  program: { fontSize: 14, marginBottom: 20 },
  card: { width: '100%', borderRadius: 14, borderWidth: 1, padding: 16, gap: 16 },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  rowLabel: { fontSize: 12 },
  rowValue: { fontSize: 15, fontWeight: '500' },
  linkButton: { marginTop: 20, fontSize: 14, fontWeight: '600' },
});
