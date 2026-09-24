import React from 'react';
import { Text, TextInput, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import { sharedStyles, Colors } from '../components/sharedStyles';

interface LoginScreenProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string;
  loading: boolean;
  onLogin: () => void;
}

export default function LoginScreen({
  username,
  setUsername,
  password,
  setPassword,
  error,
  loading,
  onLogin,
}: LoginScreenProps) {
  return (
    <ScreenLayout>
      <Text style={sharedStyles.heading}>Secure Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={sharedStyles.errorText}>{error}</Text> : null}

      <Pressable
        style={[sharedStyles.button, loading && sharedStyles.buttonDisabled]}
        onPress={onLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={sharedStyles.buttonText}>Log in</Text>
        )}
      </Pressable>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: Colors.text,
    backgroundColor: '#fbfefc',
  },
});
