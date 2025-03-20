import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Chrome as Home, User, Users, Camera, Apple } from 'lucide-react-native';
import { useEffect, useState } from 'react';

export default function TabLayout() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check user type from localStorage
    const userType = localStorage.getItem('userType');
    setIsAdmin(userType === 'admin');
  }, []);

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
        <Tabs.Screen
          name="scan"
          options={{
            title: '扫描',
            tabBarIcon: ({ color, size }) => (
              <Camera size={size} color={color} />
            ),
          }}
        />
      )}
      
      {!isAdmin && (
        <Tabs.Screen
          name="nutrition"
          options={{
            title: '营养',
            tabBarIcon: ({ color, size }) => (
              <Apple size={size} color={color} />
            ),
          }}
        />
      )}
      
      {isAdmin && (
        <Tabs.Screen
          name="users"
          options={{
            title: '用户',
            tabBarIcon: ({ color, size }) => (
              <Users size={size} color={color} />
            ),
          }}
        />
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