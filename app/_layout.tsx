import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import LoadingScreen from '../src/components/LoadingScreen';
import LoginScreen from '../src/components/LoginScreen';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { ThemeProvider, useTheme } from './theme';

function AppStack() {
  const { colors, isDark } = useTheme();
  const { signOut } = useAuth();

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        initialRouteName="lab08"
        screenOptions={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen
          name="lab08"
          options={{
            title: 'Attendance',
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14}}>
                <Link href="/quote" asChild>
                  <Text style={{ color: colors.primary, fontWeight: '600' }}>Quote</Text>
                </Link>
                <Pressable onPress={() => signOut()}>
                  <Text style={{ color: colors.danger, fontWeight: '600' }}>Log out</Text>
                </Pressable>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="course/[id]"
          options={{ title: 'Course Details', headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="student/[id]"
          options={{ title: 'Student Details', headerBackTitle: 'Back' }}
        />
        <Stack.Screen
          name="quote"
          options={{ title: 'Quote of the Day', headerBackTitle: 'Back' }}
        />
      </Stack>
    </>
  );
}

function RootLayoutNav() {
  const { isDark } = useTheme();
  const { isAuthenticated, isRestoring } = useAuth();

  if (isRestoring) {
    return (
      <>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <LoadingScreen label="Restoring your session..." />
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <LoginScreen />
      </>
    );
  }

  return <AppStack />;
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </ThemeProvider>
  );
}
