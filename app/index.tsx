import React, { useState, useEffect } from 'react';

import { loginUser, getCurrentUser, UserProfile } from '@/src/services/authService';
import { saveToken, getToken, deleteToken } from '@/src/storage/tokenStorage';
import LoadingScreen from '@/src/screens/LoadingScreen';
import LoginScreen from '@/src/screens/LoginScreen';
import ProfileScreen from '@/src/screens/ProfileScreen';

export default function Index() {
  // ---- state ----
  const [username, setUsername] = useState<string>('emilys');
  const [password, setPassword] = useState<string>('emilyspass');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // login-button loading
  const [initializing, setInitializing] = useState<boolean>(true); // startup session check
  const [error, setError] = useState<string>('');

  // ---- session restore on first load ----
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await getToken(); // Read the token from SecureStore
        if (token) {
          const userProfile = await getCurrentUser(token); // token stays local, never in state
          setProfile(userProfile); // Show the authenticated profile
        }
      } catch (e) {
        // Stored token was rejected or the request failed: clear it and
        // fall back to the login form. Never crash on a bad/expired token.
        await deleteToken();
      } finally {
        setInitializing(false);
      }
    };

    restoreSession();
  }, []);

  // ---- login handler ----
  const handleLogin = async (): Promise<void> => {
    setError(''); // 1. Clear any earlier error
    setLoading(true); // and set loading to true

    try {
      const data = await loginUser(username, password); // 2. Call loginUser with form values
      await saveToken(data.accessToken); // 3. Securely save data.accessToken

      const userProfile = await getCurrentUser(data.accessToken); // 4. Request the protected profile
      setProfile(userProfile); // and set the returned user data
    } catch (e) {
      // 5. Catch errors and show a user-friendly message (never the token,
      // never a raw crash — the login screen stays usable).
      setError('Login failed. Check your username and password.');
    } finally {
      setLoading(false); // 6. Set loading to false in a finally block
    }
  };

  // ---- logout handler ----
  const handleLogout = async (): Promise<void> => {
    await deleteToken(); // 1. Call deleteToken()
    setProfile(null); // 2. Set profile to null
    setError(''); // 3. Clear any error message
    setPassword(''); // return to a clean login form
    // 4. Returning profile to null naturally re-renders the login form.
  };

  // ---- render: starting ----
  if (initializing) {
    return <LoadingScreen />;
  }

  // ---- render: logged in ----
  if (profile) {
    return <ProfileScreen profile={profile} onLogout={handleLogout} />;
  }

  // ---- render: logged out (login form) ----
  return (
    <LoginScreen
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      error={error}
      loading={loading}
      onLogin={handleLogin}
    />
  );
}
