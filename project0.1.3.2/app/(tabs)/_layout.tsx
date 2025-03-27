import { Tabs } from 'expo-router';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { Chrome as Home, User, Camera, Apple } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabLayout() {
  const [userType, setUserType] = useState<'admin' | 'user' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserType = async () => {
      try {
        const storedUserType = await AsyncStorage.getItem('userType');
        if (storedUserType) {
          setUserType(storedUserType === 'admin' ? 'admin' : 'user');
        }
      } catch (error) {
        console.error('Error reading user type:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUserType();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!userType) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}>
      {/* 首页 - 对所有用户显示 */}
      <Tabs.Screen
        name="index"
        options={{
          title: '首页',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      
      {/* 扫描 - 仅对普通用户显示 */}
      {userType === 'user' && (
        <Tabs.Screen
          name="scan"
          options={{
            title: '扫描',
            tabBarIcon: ({ color, size }) => (
              <Camera size={size} color={color} />
            ),
            href: userType === 'user' ? '/scan' : null,
          }}
        />
      )}
      
      {/* 营养 - 仅对普通用户显示 */}
      {userType === 'user' && (
        <Tabs.Screen
          name="nutrition"
          options={{
            title: '营养',
            tabBarIcon: ({ color, size }) => (
              <Apple size={size} color={color} />
            ),
            href: userType === 'user' ? '/nutrition' : null,
          }}
        />
      )}

      {/* 个人资料 */}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    paddingTop: 5,
    paddingBottom: 5,
    height: 55,
  },
  tabBarLabel: {
    marginTop: 2,
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
});