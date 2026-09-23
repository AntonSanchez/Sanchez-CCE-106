import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../../src/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome back{user?.name ? `, ${user.name}` : ""} 👋</Text>
      <Text style={styles.body}>
        This screen only renders when a valid session token exists — it's the
        "protected UI" piece from the mini-project brief. Try closing and
        reopening the app: you should land here directly, without seeing the
        login screen again, until you log out.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  welcome: { fontSize: 22, fontWeight: "700", color: "#111827", marginBottom: 12 },
  body: { fontSize: 14, color: "#4B5563", lineHeight: 20 },
});
