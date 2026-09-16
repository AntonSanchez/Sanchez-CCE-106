import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useProfile } from '../../contexts/ProfileContext';
import { colors } from '../../constants/theme';

function getInitials(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length === 0) return '?';
  const parts = trimmed.split(/\s+/);
  const initials = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '');
  return initials.join('');
}

export default function ProfileScreen() {
  const { fullName, email, program } = useProfile();
  const router = useRouter();

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.content}>
      <Text style={styles.header}>My Profile</Text>

      <View style={styles.avatarWrap}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarInitials}>{getInitials(fullName)}</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Full Name</Text>
          <Text style={styles.infoValue}>{fullName || '—'}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{email || '—'}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Program / Course</Text>
          <Text style={styles.infoValue}>{program || '—'}</Text>
        </View>
      </View>

      {/* Programmatic navigation to the dedicated edit screen */}
      <Pressable
        style={({ pressed }) => [styles.editButton, { opacity: pressed ? 0.85 : 1 }]}
        onPress={() => router.push('/edit_profile')}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 40 },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 20,
  },
  avatarWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: colors.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  infoRow: {
    paddingVertical: 14,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 16,
    color: colors.textPrimary,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  editButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  editButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
});
