import React from 'react';
import { Text, View, Image, Pressable, StyleSheet } from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import { sharedStyles, Colors } from '../components/sharedStyles';
import { UserProfile } from '../services/authService';

interface ProfileScreenProps {
  profile: UserProfile;
  onLogout: () => void;
}

export default function ProfileScreen({ profile, onLogout }: ProfileScreenProps) {
  return (
    <ScreenLayout cardStyle={styles.profileCard}>
      {profile.image ? (
        <Image source={{ uri: profile.image }} style={styles.avatar} />
      ) : null}
      <Text style={sharedStyles.heading}>Secure Profile</Text>

      <ProfileRow label="Name" value={`${profile.firstName} ${profile.lastName}`} />
      <ProfileRow label="Username" value={profile.username} />
      <ProfileRow label="Email" value={profile.email} />
      <ProfileRow label="User ID" value={String(profile.id)} />

      <Pressable style={[sharedStyles.button, styles.logoutButton]} onPress={onLogout}>
        <Text style={sharedStyles.buttonText}>Log out</Text>
      </Pressable>
    </ScreenLayout>
  );
}

interface ProfileRowProps {
  label: string;
  value: string;
}

function ProfileRow({ label, value }: ProfileRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: Colors.primaryLight,
  },
  logoutButton: {
    backgroundColor: Colors.logout,
    marginTop: 20,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  rowLabel: {
    color: Colors.textMuted,
    fontWeight: '500',
  },
  rowValue: {
    color: Colors.text,
    fontWeight: '600',
  },
});
