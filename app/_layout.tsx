import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { EventsProvider } from '../contexts/EventsContext';
import { ProfileProvider } from '../contexts/ProfileContext';
import { colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <ProfileProvider>
      <EventsProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.surface },
            headerTintColor: colors.textPrimary,
            headerTitleStyle: { fontWeight: '700' },
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="event/[id]" options={{ title: 'Event Details' }} />
          <Stack.Screen
            name="add-event"
            options={{ title: 'Add Event', presentation: 'modal' }}
          />
          <Stack.Screen
            name="edit-event/[id]"
            options={{ title: 'Edit Event', presentation: 'modal' }}
          />
          <Stack.Screen
            name="edit_profile"
            options={{ title: 'Edit Profile', presentation: 'modal' }}
          />
        </Stack>
      </EventsProvider>
    </ProfileProvider>
  );
}
