import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { STORAGE_KEYS } from '../config';
import { login as loginRequest, fetchProfile, UserProfile } from '../services/authApi';
import { AuthError } from '../services/api';

type AuthContextValue = {
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  isRestoring: boolean;
  isLoggingIn: boolean;
  loginError: string | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  handleSessionExpired: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  // isRestoring: true only while checking SecureStore on app launch. Kept
  // separate from "logged out" so the app shows a loading screen instead of
  // flashing the login screen before the stored session is checked.
  const [isRestoring, setIsRestoring] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // ---- Session restoration on app launch ----
  useEffect(() => {
    (async () => {
      try {
        const [storedToken, storedUserRaw] = await Promise.all([
          SecureStore.getItemAsync(STORAGE_KEYS.TOKEN),
          SecureStore.getItemAsync(STORAGE_KEYS.USER),
        ]);

        if (storedToken) {
          setToken(storedToken);
          setUser(storedUserRaw ? JSON.parse(storedUserRaw) : null);

          // Re-validate against the server; throws AuthError if expired.
          const freshProfile = await fetchProfile(storedToken);
          setUser(freshProfile);
          await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(freshProfile));
        }
      } catch (err) {
        if (err instanceof AuthError) {
          await clearSession();
        }
        // Non-auth errors (e.g. offline) are ignored — keep the cached
        // session so the app still works without a connection.
      } finally {
        setIsRestoring(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    })();
  }, []);

  const clearSession = useCallback(async () => {
    await Promise.all([
      SecureStore.deleteItemAsync(STORAGE_KEYS.TOKEN),
      SecureStore.deleteItemAsync(STORAGE_KEYS.USER),
    ]);
    setToken(null);
    setUser(null);
  }, []);

  // ---- Login: validation, loading state, error message ----
  const signIn = useCallback(async (email: string, password: string) => {
    setLoginError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setLoginError('Please enter both email and password.');
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setLoginError('Please enter a valid email address.');
      return false;
    }

    setIsLoggingIn(true);
    try {
      const newToken = await loginRequest(trimmedEmail, password);

      await SecureStore.setItemAsync(STORAGE_KEYS.TOKEN, newToken);
      setToken(newToken);

      const profile = await fetchProfile(newToken);
      setUser(profile);
      await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(profile));

      return true;
    } catch (err: any) {
      setLoginError(err?.message || 'Invalid email or password.');
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  }, []);

  // ---- Logout: clears storage AND React state ----
  const signOut = useCallback(async () => {
    await clearSession();
  }, [clearSession]);

  // Any screen that gets an AuthError from a protected request calls this,
  // so 401/403 anywhere in the app funnels back to one logout path.
  const handleSessionExpired = useCallback(async () => {
    await clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: !!token,
      isRestoring,
      isLoggingIn,
      loginError,
      signIn,
      signOut,
      handleSessionExpired,
    }),
    [token, user, isRestoring, isLoggingIn, loginError, signIn, signOut, handleSessionExpired]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
