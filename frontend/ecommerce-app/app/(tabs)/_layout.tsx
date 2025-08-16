import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

// import { HapticTab } from '@/components/HapticTab';
// import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        // tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) =>    <MaterialIcons name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="AddToCart"
        options={{
          title: 'AddToCart',
          tabBarIcon: ({ color }) => <FontAwesome name="shopping-cart" size={24} color={color}  />,
        }}
      />
           <Tabs.Screen
        name="Favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) =><FontAwesome name="heart" size={24} color={color} />,
        }}
      />
       <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profiles',
          tabBarIcon: ({ color }) =><FontAwesome name="user-o" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}