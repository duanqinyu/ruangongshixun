import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import { Mail, Lock, Phone } from 'lucide-react-native';

// Default admin credentials
const ADMIN_EMAIL = 'admin@123.com';
const ADMIN_PASSWORD = 'admin123';

export default function LoginScreen() {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');

    if (loginMethod === 'email') {
      if (!email) {
        setError('请输入邮箱');
        return;
      }
      if (!password) {
        setError('请输入密码');
        return;
      }

      // Check admin credentials
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        router.replace('/(tabs)');
      } else {
        setError('邮箱或密码错误');
      }
    } else {
      if (!phone) {
        setError('请输入手机号');
        return;
      }
      if (!password) {
        setError('请输入密码');
        return;
      }

      // For demo purposes, allow any phone number with correct admin password
      if (password === ADMIN_PASSWORD) {
        router.replace('/(tabs)');
      } else {
        setError('手机号或密码错误');
      }
    }
  };

  const handleThirdPartyLogin = (platform: string) => {
    Alert.alert('提示', `${platform}登录功能即将上线`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg' }}
          style={styles.logo}
        />
        <Text style={styles.title}>商家管理系统</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, loginMethod === 'email' && styles.activeTab]}
          onPress={() => {
            setLoginMethod('email');
            setError('');
          }}
        >
          <Text style={[styles.tabText, loginMethod === 'email' && styles.activeTabText]}>邮箱登录</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, loginMethod === 'phone' && styles.activeTab]}
          onPress={() => {
            setLoginMethod('phone');
            setError('');
          }}
        >
          <Text style={[styles.tabText, loginMethod === 'phone' && styles.activeTabText]}>手机号登录</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.inputContainer}>
        {loginMethod === 'email' ? (
          <View style={styles.inputWrapper}>
            <Mail size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="请输入邮箱 (admin@123.com)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        ) : (
          <View style={styles.inputWrapper}>
            <Phone size={20} color="#666" />
            <TextInput
              style={styles.input}
              placeholder="请输入手机号"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={11}
            />
          </View>
        )}

        <View style={styles.inputWrapper}>
          <Lock size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="请输入密码 (admin123)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>登录</Text>
      </TouchableOpacity>

      <View style={styles.thirdPartyContainer}>
        <Text style={styles.thirdPartyText}>第三方登录</Text>
        <View style={styles.thirdPartyButtons}>
          <TouchableOpacity 
            style={styles.thirdPartyButton}
            onPress={() => handleThirdPartyLogin('微信')}
          >
            <Image
              source={{ uri: 'https://images.pexels.com/photos/11311435/pexels-photo-11311435.jpeg' }}
              style={styles.thirdPartyIcon}
            />
            <Text style={styles.thirdPartyButtonText}>微信</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.thirdPartyButton}
            onPress={() => handleThirdPartyLogin('QQ')}
          >
            <Image
              source={{ uri: 'https://images.pexels.com/photos/11311436/pexels-photo-11311436.jpeg' }}
              style={styles.thirdPartyIcon}
            />
            <Text style={styles.thirdPartyButtonText}>QQ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  errorText: {
    color: '#FF3B30',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  thirdPartyContainer: {
    marginTop: 40,
  },
  thirdPartyText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  thirdPartyButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
  },
  thirdPartyButton: {
    alignItems: 'center',
  },
  thirdPartyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
  },
  thirdPartyButtonText: {
    color: '#666',
  },
});