import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index"
        options={{ 
          headerShown: false 
        }}
      />
      <Stack.Screen 
        name="merchant-info"
        options={{ 
          title: '商家信息',
          headerTintColor: '#007AFF',
        }}
      />
      <Stack.Screen 
        name="store-management"
        options={{ 
          title: '店铺管理',
          headerTintColor: '#007AFF',
        }}
      />
      <Stack.Screen 
        name="notifications"
        options={{ 
          title: '通知设置',
          headerTintColor: '#007AFF',
        }}
      />
      <Stack.Screen 
        name="security"
        options={{ 
          title: '账号安全',
          headerTintColor: '#007AFF',
        }}
      />
    </Stack>
  );
}