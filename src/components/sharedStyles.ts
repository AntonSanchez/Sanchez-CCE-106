import { StyleSheet } from 'react-native';

export const Colors = {
  background: '#eaf6ec',
  card: '#ffffff',
  primary: '#43a047',
  primaryDark: '#2e7d32',
  primaryLight: '#c8e6c9',
  text: '#1b3320',
  textMuted: '#5c7a63',
  border: '#cfe8d3',
  error: '#c0392b',
  errorBg: '#fdecea',
  success: '#2e7d32',
  successBg: '#e6f4ea',
  logout: '#d97a6c',
};

export const sharedStyles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
    color: Colors.text,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  errorText: {
    color: Colors.error,
    marginBottom: 12,
    textAlign: 'center',
  },
  helperText: {
    marginTop: 12,
    color: Colors.textMuted,
  },
});
