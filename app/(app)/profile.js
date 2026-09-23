import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, RefreshControl, ScrollView } from "react-native";
import { useAuth } from "../../src/context/AuthContext";
import { fetchProfile } from "../../src/services/authApi";
import { AuthError } from "../../src/services/api";
import LoadingScreen from "../../src/components/LoadingScreen";
import ErrorMessage from "../../src/components/ErrorMessage";

export default function Profile() {
  const { token, user, signOut, handleSessionExpired } = useAuth();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(!user);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadProfile = useCallback(
    async (opts = {}) => {
      try {
        setError(null);
        // This is the "protected API request": it sends the stored bearer
        // token, and the shared api.js wrapper throws AuthError on 401/403.
        const data = await fetchProfile(token);
        setProfile(data);
      } catch (err) {
        if (err instanceof AuthError) {
          // Session expired mid-use — clear it and the layout guard will
          // redirect to /login automatically on next render.
          await handleSessionExpired();
        } else {
          setError(err.message || "Could not load your profile.");
        }
      } finally {
        setLoading(false);
        if (opts.pullToRefresh) setRefreshing(false);
      }
    },
    [token, handleSessionExpired]
  );

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <LoadingScreen label="Loading profile..." />;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            loadProfile({ pullToRefresh: true });
          }}
        />
      }
    >
      <ErrorMessage message={error} />

      {profile?.avatar ? <Image source={{ uri: profile.avatar }} style={styles.avatar} /> : null}

      <Text style={styles.name}>{profile?.name}</Text>
      <Text style={styles.email}>{profile?.email}</Text>

      {/* Role-aware interface: different content depending on the user's role */}
      <View style={[styles.badge, profile?.role === "admin" ? styles.badgeAdmin : styles.badgeStudent]}>
        <Text style={styles.badgeText}>{profile?.role === "admin" ? "Administrator" : "Student"}</Text>
      </View>

      {profile?.role === "admin" ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Admin tools</Text>
          <Text style={styles.sectionBody}>Manage enrollments, grades, and announcements.</Text>
        </View>
      ) : (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My courses</Text>
          <Text style={styles.sectionBody}>View grades, schedules, and assignments.</Text>
        </View>
      )}

      {/* Demo button matching the "401 on every request" troubleshooting item:
          proves the interceptor logic works without needing a real expired token. */}
      <Pressable
        style={styles.secondaryButton}
        onPress={async () => {
          await handleSessionExpired();
        }}
      >
        <Text style={styles.secondaryButtonText}>Simulate session expiry</Text>
      </Pressable>

      <Pressable style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", padding: 24, backgroundColor: "#fff" },
  avatar: { width: 96, height: 96, borderRadius: 48, marginTop: 8, marginBottom: 16 },
  name: { fontSize: 20, fontWeight: "700", color: "#111827" },
  email: { fontSize: 14, color: "#6B7280", marginBottom: 12 },
  badge: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999, marginBottom: 20 },
  badgeStudent: { backgroundColor: "#DBEAFE" },
  badgeAdmin: { backgroundColor: "#FEF3C7" },
  badgeText: { fontSize: 12, fontWeight: "700", color: "#374151" },
  section: { width: "100%", backgroundColor: "#F9FAFB", borderRadius: 12, padding: 16, marginBottom: 12 },
  sectionTitle: { fontWeight: "700", fontSize: 14, color: "#111827", marginBottom: 4 },
  sectionBody: { fontSize: 13, color: "#6B7280" },
  secondaryButton: { marginTop: 20, paddingVertical: 10 },
  secondaryButtonText: { color: "#9CA3AF", fontSize: 12, textDecorationLine: "underline" },
  logoutButton: {
    marginTop: 12,
    backgroundColor: "#DC2626",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  logoutButtonText: { color: "#fff", fontWeight: "700" },
});
