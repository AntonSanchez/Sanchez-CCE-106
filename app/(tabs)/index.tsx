import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Text,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';

type Task = {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
};

export default function HomeScreen() {
  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Finish React Native activity',
      dueDate: '09/05/2026',
      completed: false,
    },
    {
      id: '2',
      title: 'Review programming notes',
      dueDate: '09/03/2026',
      completed: true,
    },
  ]);

  const addTask = () => {
    if (!taskTitle.trim()) {
      Alert.alert('Missing Task Title', 'Please enter a task title.');
      return;
    }

    if (!dueDate.trim()) {
      Alert.alert('Missing Due Date', 'Please enter a due date.');
      return;
    }

    // Check MM/DD/YYYY format
    const datePattern =
      /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;

    if (!datePattern.test(dueDate)) {
      Alert.alert(
        'Invalid Due Date',
        'Please enter the date in MM/DD/YYYY format.'
      );
      return;
    }

    const [month, day, year] = dueDate.split('/').map(Number);

    const selectedDate = new Date(year, month - 1, day);

    // Check if the date actually exists
    if (
      selectedDate.getFullYear() !== year ||
      selectedDate.getMonth() !== month - 1 ||
      selectedDate.getDate() !== day
    ) {
      Alert.alert(
        'Invalid Due Date',
        'Please enter a valid calendar date.'
      );
      return;
    }

    // Get today's date without the time
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if the due date has already passed
    if (selectedDate < today) {
      Alert.alert(
        'Invalid Due Date',
        'The due date cannot be in the past.'
      );
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      dueDate: dueDate.trim(),
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);

    setTaskTitle('');
    setDueDate('');
  };

  const toggleTask = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.filter((item) => item.id !== id)
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.header}>
              <ThemedText type="title" style={styles.title}>
                My Tasks
              </ThemedText>

              <ThemedText style={styles.subtitle}>
                Do it, Do it now.
              </ThemedText>
            </View>

            {/* Student Information */}
            <View style={styles.card}>
              <ThemedText type="subtitle" style={styles.cardTitle}>
                Student Information
              </ThemedText>

              <TextInput
                style={styles.input}
                value="Anton James R. Sanchez"
                editable={false}
              />

              <TextInput
                style={styles.input}
                value="BS Information Technology"
                editable={false}
              />
            </View>

            {/* Task Summary */}
            <View style={styles.summary}>
              <ThemedText style={styles.summaryTitle}>
                Task Summary
              </ThemedText>

              <View style={styles.summaryRow}>
                <ThemedText style={styles.summaryLabel}>
                  Total Tasks
                </ThemedText>

                <ThemedText style={styles.summaryValue}>
                  {tasks.length}
                </ThemedText>
              </View>

              <View style={styles.summaryRow}>
                <ThemedText style={styles.summaryLabel}>
                  Completed
                </ThemedText>

                <ThemedText style={styles.completedValue}>
                  {tasks.filter((item) => item.completed).length}
                </ThemedText>
              </View>

              <View style={styles.summaryRow}>
                <ThemedText style={styles.summaryLabel}>
                  Remaining
                </ThemedText>

                <ThemedText style={styles.remainingValue}>
                  {tasks.filter((item) => !item.completed).length}
                </ThemedText>
              </View>
            </View>

            {/* Add Task */}
            <View style={styles.card}>
              <ThemedText type="subtitle" style={styles.cardTitle}>
                Add New Task
              </ThemedText>

              {/* Task Title */}
              <TextInput
                style={styles.input}
                placeholder="Task title"
                placeholderTextColor="#777"
                value={taskTitle}
                onChangeText={setTaskTitle}
              />

              {/* Due Date */}
              <TextInput
                style={styles.input}
                placeholder="Due date (MM/DD/YYYY)"
                placeholderTextColor="#777"
                value={dueDate}
                onChangeText={setDueDate}
                keyboardType="numbers-and-punctuation"
                maxLength={10}
              />

              <Pressable
                style={({ pressed }) => [
                  styles.addButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={addTask}
              >
                <ThemedText style={styles.addButtonText}>
                  + Add Task
                </ThemedText>
              </Pressable>
            </View>

            {/* Task List Title */}
            <ThemedText type="subtitle" style={styles.listTitle}>
              Current Task List
            </ThemedText>
          </>
        }
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Pressable
              style={styles.taskContent}
              onPress={() => toggleTask(item.id)}
            >
              <View
                style={[
                  styles.checkbox,
                  item.completed && styles.checkboxCompleted,
                ]}
              >
                {item.completed && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>

              <View style={styles.taskDetails}>
                <ThemedText
                  style={[
                    styles.taskText,
                    item.completed && styles.completedTask,
                  ]}
                >
                  {item.title}
                </ThemedText>

                <ThemedText style={styles.dueDate}>
                  Due: {item.dueDate}
                </ThemedText>
              </View>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <ThemedText style={styles.deleteText}>
                Delete
              </ThemedText>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <ThemedText style={styles.emptyText}>
            No tasks yet. Add your first task above.
          </ThemedText>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },

  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 25,
  },

  title: {
    color: '#FFFFFF',
    marginBottom: 6,
  },

  subtitle: {
    color: '#8B949E',
    fontSize: 15,
  },

  card: {
    backgroundColor: '#161B22',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#30363D',
  },

  cardTitle: {
    color: '#FFFFFF',
    marginBottom: 14,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#30363D',
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: '#0D1117',
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },

  addButton: {
    height: 48,
    borderRadius: 10,
    backgroundColor: '#238636',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  buttonPressed: {
    opacity: 0.7,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  listTitle: {
    color: '#FFFFFF',
    marginTop: 5,
    marginBottom: 12,
  },

  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#161B22',
    borderWidth: 1,
    borderColor: '#30363D',
  },

  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#58A6FF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxCompleted: {
    backgroundColor: '#238636',
    borderColor: '#238636',
  },

  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 18,
    textAlign: 'center',
    includeFontPadding: false,
  },

  taskDetails: {
    flex: 1,
  },

  taskText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },

  completedTask: {
    textDecorationLine: 'line-through',
    color: '#8B949E',
  },

  dueDate: {
    color: '#58A6FF',
    fontSize: 13,
  },

  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },

  deleteText: {
    color: '#F85149',
    fontWeight: '600',
    fontSize: 13,
  },

  emptyText: {
    textAlign: 'center',
    color: '#8B949E',
    marginVertical: 30,
  },

  summary: {
    marginBottom: 16,
    padding: 18,
    borderRadius: 16,
    backgroundColor: '#161B22',
    borderWidth: 1,
    borderColor: '#30363D',
  },

  summaryTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },

  summaryLabel: {
    color: '#8B949E',
  },

  summaryValue: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  completedValue: {
    color: '#3FB950',
    fontWeight: 'bold',
  },

  remainingValue: {
    color: '#58A6FF',
    fontWeight: 'bold',
  },
});
