import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react-native';

// Admin credentials
const ADMIN_EMAIL = 'admin@123.com';
const ADMIN_PASSWORD = 'admin123';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  // Get URL params to check if we're coming from a logout
  const params = useLocalSearchParams();
  
  useEffect(() => {
    // If reset param is true, we're coming from logout
    if (params.reset === 'true') {
      console.log('User logged out successfully');
    }
  }, [params]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    // Check for admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Admin login successful
      router.replace('/(tabs)');
      return;
    }

    // Regular user validation
    let isValid = true;

    if (!email) {
      setEmailError('请输入邮箱');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('请输入有效的邮箱地址');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('请输入密码');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('密码至少需要6个字符');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      // In a real app, you would authenticate with a backend here
      // For now, we'll just navigate to the main app
      router.replace('/(tabs)');
    }
  };

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
    if (!isAdminMode) {
      // Switching to admin mode, pre-fill admin credentials
      setEmail(ADMIN_EMAIL);
      setPassword(ADMIN_PASSWORD);
    } else {
      // Switching back to regular mode, clear fields
      setEmail('');
      setPassword('');
    }
    // Clear any errors
    setEmailError('');
    setPasswordError('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80' }} 
              style={styles.logo} 
            />
            <Text style={styles.appName}>卡路里追踪</Text>
            <Text style={styles.tagline}>智能饮食，健康生活</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{isAdminMode ? '管理员登录' : '登录'}</Text>
              <TouchableOpacity 
                style={[styles.adminModeButton, isAdminMode && styles.adminModeButtonActive]} 
                onPress={toggleAdminMode}
              >
                <ShieldCheck size={20} color={isAdminMode ? '#FFFFFF' : '#007AFF'} />
              </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>
              {isAdminMode 
                ? '使用管理员账号登录系统' 
                : '欢迎回来！请登录您的账户'}
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>邮箱</Text>
              <TextInput
                style={[styles.input, emailError ? styles.inputError : null]}
                placeholder="请输入您的邮箱"
                placeholderTextColor="#8E8E93"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                editable={!isAdminMode} // Disable editing in admin mode
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>密码</Text>
              <View style={[styles.passwordContainer, passwordError ? styles.inputError : null]}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="请输入您的密码"
                  placeholderTextColor="#8E8E93"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  editable={!isAdminMode} // Disable editing in admin mode
                />
                <TouchableOpacity 
                  style={styles.eyeIcon} 
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#8E8E93" />
                  ) : (
                    <Eye size={20} color="#8E8E93" />
                  )}
                </TouchableOpacity>
              </View>
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>

            {!isAdminMode && (
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>忘记密码？</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={[styles.loginButton, isAdminMode && styles.adminLoginButton]} 
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>
                {isAdminMode ? '管理员登录' : '登录'}
              </Text>
              <ArrowRight size={20} color="#FFFFFF" />
            </TouchableOpacity>

            {!isAdminMode && (
              <>
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>或</Text>
                  <View style={styles.dividerLine} />
                </View>

                <View style={styles.socialButtonsContainer}>
                  <TouchableOpacity style={styles.socialButton}>
                    <Image 
                      source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Wechat_logo.svg/1200px-Wechat_logo.svg.png' }} 
                      style={styles.socialIcon} 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}>
                    <Image 
                      source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Sina_Weibo.svg/1200px-Sina_Weibo.svg.png' }} 
                      style={styles.socialIcon} 
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton}>
                    <Image 
                      source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png' }} 
                      style={styles.socialIcon} 
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>还没有账户？</Text>
                  <Link href="/auth/register" asChild>
                    <TouchableOpacity>
                      <Text style={styles.registerLink}>立即注册</Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              </>
            )}

            {isAdminMode && (
              <View style={styles.adminInfoContainer}>
                <Text style={styles.adminInfoText}>
                  管理员账号: {ADMIN_EMAIL}
                </Text>
                <Text style={styles.adminInfoText}>
                  管理员密码: {ADMIN_PASSWORD}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 16,
  },
  appName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 8,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#000000',
  },
  adminModeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  adminModeButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    height: 56,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#000000',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FF3B30',
    marginTop: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#000000',
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#007AFF',
  },
  loginButton: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  adminLoginButton: {
    backgroundColor: '#FF9500',
  },
  loginButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dividerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginHorizontal: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  socialIcon: {
    width: 28,
    height: 28,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  registerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
  },
  registerLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 4,
  },
  adminInfoContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  adminInfoText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#636366',
    marginBottom: 8,
  },
});