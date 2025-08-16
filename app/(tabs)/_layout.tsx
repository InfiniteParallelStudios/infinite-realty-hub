import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: Platform.select({
          ios: {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderTopWidth: 0,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          default: {
            backgroundColor: '#fff',
            borderTopColor: '#e0e0e0',
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: () => null, // We'll add icons later
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: 'Store',
          tabBarIcon: () => null,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: () => null,
        }}
      />
    </Tabs>
  );
}
