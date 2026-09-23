import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import { STORAGE_KEYS } from "../config";
import { login as loginRequest, fetchProfile } from "../services/authApi";
import { AuthError } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // isRestoring: true only while we're checking SecureStore on app launch.
  // Kept separate from "logged out" so the app can show a splash/loading
  // screen instead of flashing the login screen first (a listed common mistake).
  const [isRestoring, setIsRestoring] = useState(true);

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // ---- 1. Session restoration on app launch ----
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

          // Re-validate the token against the server. If it has expired,
          // this will throw AuthError and clearSession() below runs.
          const freshProfile = await fetchProfile(storedToken);
          setUser(freshProfile);
          await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(freshProfile));
        }
      } catch (err) {
        if (err instanceof AuthError) {
          await clearSession();
        }
        // Non-auth errors (e.g. offline) are ignored here — we keep the
        // cached token/user so the app still works without a connection.
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

  // ---- 2. Login: validation, loading state, error message ----
  const signIn = useCallback(async (email, password) => {
    setLoginError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setLoginError("Please enter both email and password.");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setLoginError("Please enter a valid email address.");
      return false;
    }

    setIsLoggingIn(true);
    try {
      const newToken = await loginRequest(trimmedEmail, password);

      // Save token securely BEFORE using it, so a crash mid-fetch still
      // leaves a valid persisted session.
      await SecureStore.setItemAsync(STORAGE_KEYS.TOKEN, newToken);
      setToken(newToken);

      const profile = await fetchProfile(newToken);
      setUser(profile);
      await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(profile));

      return true;
    } catch (err) {
      setLoginError(err.message || "Invalid email or password.");
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  }, []);

  // ---- 3. Logout: clears storage AND React state ----
  const signOut = useCallback(async () => {
    await clearSession();
  }, [clearSession]);

  // Called by any screen that gets an AuthError from a protected request,
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

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
