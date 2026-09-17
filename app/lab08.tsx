import { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useTheme } from './theme';

type Status = 'unmarked' | 'present' | 'absent';

type Student = {
  id: number;
  name: string;
  status: Status;
};

export default function Lab08Screen() {
  const { colors, isDark } = useTheme();

  const [students, setStudents] = useState<Student[]>([]);
  const [newName, setNewName] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  useEffect(() => {
    setTotalCount(students.length);
    setPresentCount(students.filter((s) => s.status === 'present').length);
    setAbsentCount(students.filter((s) => s.status === 'absent').length);
  }, [students]);

  const handleAddStudent = () => {
    const trimmed = newName.trim();
    if (trimmed === '') return;

    setStudents((prev) => [
      ...prev,
      { id: Date.now(), name: trimmed, status: 'unmarked' },
    ]);
    setNewName('');
  };

  const handleSetStatus = (id: number, status: Status) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  const handleRemoveStudent = (id: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        Attendance List
      </Text>

      <View
        style={[
          styles.summaryCard,
          { backgroundColor: isDark ? '#1e3a5f' : '#eff6ff' },
        ]}
      >
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: colors.primary }]}>
            {totalCount}
          </Text>
          <Text style={[styles.summaryLabel, { color: colors.subtleText }]}>
            Total
          </Text>
        </View>
        <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: '#16a34a' }]}>
            {presentCount}
          </Text>
          <Text style={[styles.summaryLabel, { color: colors.subtleText }]}>
            Present
          </Text>
        </View>
        <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: colors.danger }]}>
            {absentCount}
          </Text>
          <Text style={[styles.summaryLabel, { color: colors.subtleText }]}>
            Absent
          </Text>
        </View>
      </View>

      <View style={styles.addRow}>
        <TextInput
          placeholder="Full name"
          placeholderTextColor={colors.subtleText}
          value={newName}
          onChangeText={setNewName}
          onSubmitEditing={handleAddStudent}
          returnKeyType="done"
          style={[
            styles.input,
            { backgroundColor: colors.card, borderColor: colors.border, color: colors.text },
          ]}
        />
        <Pressable
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={handleAddStudent}
        >
          <Text style={[styles.addButtonText, { color: colors.primaryText }]}>
            Add
          </Text>
        </Pressable>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Students
      </Text>

      {students.length === 0 && (
        <Text style={[styles.emptyText, { color: colors.subtleText }]}>
          No students added yet.
        </Text>
      )}

      {students.map((s) => (
        <View
          key={s.id}
          style={[
            styles.studentRow,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.studentName, { color: colors.text }]}>
            {s.name}
          </Text>

          <View style={styles.statusButtons}>
            <Pressable
              onPress={() => handleSetStatus(s.id, 'present')}
              style={[
                styles.statusButton,
                {
                  backgroundColor: s.status === 'present' ? '#16a34a' : colors.background,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={{
                  color: s.status === 'present' ? '#ffffff' : colors.text,
                  fontWeight: '700',
                }}
              >
                P
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handleSetStatus(s.id, 'absent')}
              style={[
                styles.statusButton,
                {
                  backgroundColor: s.status === 'absent' ? colors.danger : colors.background,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={{
                  color: s.status === 'absent' ? '#ffffff' : colors.text,
                  fontWeight: '700',
                }}
              >
                A
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handleRemoveStudent(s.id)}
              style={[
                styles.removeButton,
                { backgroundColor: colors.background, borderColor: colors.border },
              ]}
            >
              <Text style={{ color: colors.danger, fontWeight: '700' }}>✕</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40, gap: 12 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  summaryCard: { flexDirection: 'row', borderRadius: 16, paddingVertical: 16, marginBottom: 4 },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: { fontSize: 24, fontWeight: '700' },
  summaryLabel: { fontSize: 12, marginTop: 4, textAlign: 'center' },
  summaryDivider: { width: 1 },
  addRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  addButton: {
    borderRadius: 10,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  addButtonText: { fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginTop: 8 },
  emptyText: { fontSize: 13, textAlign: 'center', marginTop: 8 },
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  studentName: { fontSize: 15, fontWeight: '600' },
  statusButtons: { flexDirection: 'row', gap: 8 },
  statusButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
