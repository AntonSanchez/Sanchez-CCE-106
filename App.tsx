import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import NotificationBanner, { NotificationData } from './src/components/NotificationBanner';
import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { getCurrentUser, loginUser, UserProfile } from './src/services/authService';
import { deleteToken, getToken, saveToken } from './src/storage/tokenStorage';

export default function App() {

  const [username, setUsername] = useState<string>('emilys');
  const [password, setPassword] = useState<string>('emilyspass');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loggingOut, setLoggingOut] = useState<boolean>(false);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [notification, setNotification] = useState<NotificationData | null>(null);


  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await getToken();
        if (token) {
          const userProfile = await getCurrentUser(token);
          setProfile(userProfile);
        }
      } catch (e) {
        await deleteToken();
      } finally {
        setInitializing(false);
      }
    };

    restoreSession();
  }, []);


  const handleLogin = async (): Promise<void> => {
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(username, password);
      await saveToken(data.accessToken);

      const userProfile = await getCurrentUser(data.accessToken);
      setProfile(userProfile);
      setNotification({
        type: 'success',
        message: `Welcome back, ${userProfile.firstName}!`,
      });
    } catch (e) {
      setError('Login failed. Check your username and password.');
      setNotification({
        type: 'error',
        message: 'Login failed. Check your username and password.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (): Promise<void> => {
    setLoggingOut(true);
    try {
      await deleteToken();
      setProfile(null);
      setError('');
      setPassword('');
      setNotification({ type: 'success', message: 'You have been logged out.' });
    } finally {
      setLoggingOut(false);
    }
  };

  let content: React.ReactNode;

  if (initializing) {
    content = <LoadingScreen message="Checking for a saved session…" />;
  } else if (loading) {
    content = <LoadingScreen message="Logging in…" />;
  } else if (loggingOut) {
    content = <LoadingScreen message="Logging out…" />;
  } else if (profile) {
    content = <ProfileScreen profile={profile} onLogout={handleLogout} />;
  } else {
    content = (
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

  return (
    <View style={{ flex: 1 }}>
      {content}
      <NotificationBanner
        notification={notification}
        onDismiss={() => setNotification(null)}
      />
    </View>
  );
}
