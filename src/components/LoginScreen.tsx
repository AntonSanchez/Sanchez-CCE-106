import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../../app/theme';
import ErrorMessage from './ErrorMessage';

export default function LoginScreen() {
  const { signIn, isLoggingIn, loginError } = useAuth();
  const { colors } = useTheme();
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');

  const handleSubmit = async () => {
    await signIn(email, password);
    // On success, isAuthenticated flips true and the root layout swaps
    // this screen out for the main Stack automatically.
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={[styles.title, { color: colors.text }]}>Student Portal</Text>
        <Text style={[styles.subtitle, { color: colors.subtleText }]}>Sign in to continue</Text>

        <ErrorMessage message={loginError} />

        <Text style={[styles.label, { color: colors.subtleText }]}>Email</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
          value={email}
          onChangeText={setEmail}
          placeholder="you@school.edu"
          placeholderTextColor={colors.subtleText}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          editable={!isLoggingIn}
        />

        <Text style={[styles.label, { color: colors.subtleText }]}>Password</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          placeholderTextColor={colors.subtleText}
          secureTextEntry
          editable={!isLoggingIn}
        />

        <Pressable
          style={[styles.button, { backgroundColor: colors.primary }, isLoggingIn && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoggingIn}
        >
          <Text style={[styles.buttonText, { color: colors.primaryText }]}>
            {isLoggingIn ? 'Signing in...' : 'Log In'}
          </Text>
        </Pressable>

        <Text style={[styles.hint, { color: colors.subtleText }]}>
          Demo credentials are pre-filled (reqres.in test account). Any other
          email/password combination shows the invalid-credentials error.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 15, marginBottom: 24 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 },
  button: { borderRadius: 10, paddingVertical: 14, alignItems: 'center', marginTop: 24 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { fontWeight: '700', fontSize: 15 },
  hint: { fontSize: 12, marginTop: 16, textAlign: 'center' },
});
