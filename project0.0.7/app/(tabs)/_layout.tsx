import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Chrome as Home, User } from 'lucide-react-native';

// Get user type from login credentials
const isAdmin = window.location.href.includes('admin@123.com');

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      {!isAdmin && (
        <>
          <Tabs.Screen
            name="scan"
            options={{
              title: '扫描',
              href: null, // Hide for admin
            }}
          />
          <Tabs.Screen
            name="nutrition"
            options={{
              title: '营养',
              href: null, // Hide for admin
            }}
          />
        </>
      )}
      <Tabs.Screen
        name="profile"
        options={{
          title: '我的',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    height: 60,
    paddingBottom: 5,
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
});