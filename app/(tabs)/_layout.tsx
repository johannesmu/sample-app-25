import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Ionicons } from '@expo/vector-icons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUser } from '@/contexts/UserContext';
import { UserProvider } from '@/contexts/UserContext';
import { useData } from '@/contexts/UserDataContext';
import { DataProvider } from '@/contexts/UserDataContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const user = useUser()
  const data = useData()
  return (
    <UserProvider value={user}>
      <DataProvider value={data}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
              ios: {
                // Use a transparent background on iOS to show the blur effect
                position: 'absolute',
              },
              default: {},
            }),
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="add"
            options={{
              title: 'Add',
              tabBarIcon: ({ color }) => <Ionicons size={28} name="add-circle" color={color} />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => <Ionicons size={28} name="person-circle" color={color} />,
            }}
          />
          <Tabs.Screen  name="detail/[id]" options={{href:null}}/>
           
        </Tabs>
    </DataProvider>
  </UserProvider>
  );
}
