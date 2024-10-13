import React from 'react';
import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
export default function Layout() {
  return (
    <LinearGradient colors={['#0f172a', '#334155']} className="flex-1">
      <Stack
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'transparent' },
          headerShown: true,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'slide_from_right',
        }}
      />
    </LinearGradient>
  );
}
