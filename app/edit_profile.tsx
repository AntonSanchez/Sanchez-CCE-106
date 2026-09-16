import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';
import Toast from '../components/Toast';
import { colors } from '../constants/theme';
import { useProfile } from '../contexts/ProfileContext';

const FULL_NAME_MAX_LENGTH = 40;

function stripDigits(text: string): string {
  return text.replace(/[0-9]/g, '');
}

export default function EditProfileScreen() {
  const router = useRouter();
  const { fullName: savedFullName, email: savedEmail, program: savedProgram, updateProfile } =
    useProfile();

  const [fullName, setFullName] = useState(savedFullName);
  const [email, setEmail] = useState(savedEmail);
  const [program, setProgram] = useState(savedProgram);
  const [error, setError] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const isNameEmpty = fullName.trim().length === 0;
  const isEmailEmpty = email.trim().length === 0;
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSave = () => {
    if (isNameEmpty) {
      setError('Full name is required.');
      return;
    }
    if (/\d/.test(fullName)) {
      setError('Full name cannot contain numbers.');
      return;
    }
    if (isEmailEmpty) {
      setError('Email is required.');
      return;
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    updateProfile({ fullName: fullName.trim(), email: email.trim(), program: program.trim() });

    setShowToast(true);
    setTimeout(() => {
      router.back();
    }, 900);
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Edit Profile</Text>
        <Text style={styles.subtitle}>Fields marked * are required.</Text>

        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          value={fullName}
          onChangeText={(text) => {
            setFullName(stripDigits(text));
            if (error) setError('');
          }}
          placeholder="Your Full Name"
          maxLength={FULL_NAME_MAX_LENGTH}
        />
        <Text style={styles.charCount}>
          {fullName.length}/{FULL_NAME_MAX_LENGTH}
        </Text>

        <Text style={styles.label}>Email *</Text>
        <TextInput
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (error) setError('');
          }}
          placeholder="Example@Example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Program / Course</Text>
        <TextInput
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          value={program}
          onChangeText={setProgram}
          placeholder="Your Program/Course"
        />

        {error.length > 0 && <Text style={styles.errorText}>{error}</Text>}

        <Pressable
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={handleSave}
          disabled={isNameEmpty || isEmailEmpty}
          style={[
            styles.saveButton,
            isPressed && !(isNameEmpty || isEmailEmpty) && styles.saveButtonPressed,
            (isNameEmpty || isEmailEmpty) && styles.saveButtonDisabled,
          ]}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.cancelButton, { opacity: pressed ? 0.7 : 1 }]}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
      </ScrollView>

      <Toast
        visible={showToast}
        message="Profile updated!"
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
  charCount: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'right',
    marginTop: 4,
  },
  errorText: {
    color: colors.error,
    marginTop: 12,
    fontSize: 13,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonPressed: {
    backgroundColor: colors.primaryPressed,
  },
  saveButtonDisabled: {
    backgroundColor: colors.disabled,
  },
  saveButtonText: {
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
});
