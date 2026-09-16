import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ProfileData {
  fullName: string;
  email: string;
  program: string;
}

interface ProfileContextValue extends ProfileData {
  updateProfile: (data: ProfileData) => void;
}

const defaultProfile: ProfileData = {
  fullName: 'Alex Rivera',
  email: 'alex.rivera@campus.edu',
  program: 'BS Computer Science',
};

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);

  const updateProfile = (data: ProfileData) => {
    setProfile(data);
  };

  return (
    <ProfileContext.Provider value={{ ...profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
