import React from "react";
import { Redirect, Tabs } from "expo-router";
import { useAuth } from "../../src/context/AuthContext";
import LoadingScreen from "../../src/components/LoadingScreen";

export default function ProtectedLayout() {
  const { isAuthenticated, isRestoring } = useAuth();

  if (isRestoring) {
    return <LoadingScreen label="Checking your session..." />;
  }

  // Route guard: anything under app/(app)/ requires a valid session.
  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#0B63C5" },
        headerTintColor: "#fff",
        tabBarActiveTintColor: "#0B63C5",
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
