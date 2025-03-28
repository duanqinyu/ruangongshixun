import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, ChevronRight, Award, Calendar, ChartBar as BarChart2, Clock, Zap, LogOut, X, Camera, Mail, Key, User } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function ProfileScreen() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [height, setHeight] = useState('165');
  const [weight, setWeight] = useState('65');
  const [age, setAge] = useState('27');
  
  // Settings state
  const [name, setName] = useState('张小红');
  const [email, setEmail] = useState('zhang.xiaohong@example.com');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      "退出登录",
      "确定要退出登录吗？",
      [
        {
          text: "取消",
          style: "cancel"
        },
        { 
          text: "确定", 
          onPress: () => {
            router.navigate({
              pathname: '/auth/login',
              params: {
                reset: 'true'
              }
            });
          }
        }
      ]
    );
  };

  const handleSaveProfile = () => {
    setShowEditModal(false);
  };

  const handleSaveSettings = () => {
    if (showChangePassword) {
      if (newPassword !== confirmPassword) {
        Alert.alert('错误', '两次输入的新密码不一致');
        return;
      }
      if (newPassword.length < 6) {
        Alert.alert('错误', '密码长度至少为6位');
        return;
      }
    }
    setShowSettingsModal(false);
    setShowChangePassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleChangeAvatar = () => {
    Alert.alert(
      "更换头像",
      "选择头像来源",
      [
        {
          text: "拍照",
          onPress: () => console.log("Camera")
        },
        {
          text: "从相册选择",
          onPress: () => console.log("Gallery")
        },
        {
          text: "取消",
          style: "cancel"
        }
      ]
    );
  };

  const handleViewSubscription = () => {
    router.push('/screens/subscription');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>个人资料</Text>
        <TouchableOpacity onPress={() => setShowSettingsModal(true)}>
          <Settings size={24} color="#000000" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: avatarUrl }} 
            style={styles.profileImage} 
          />
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileEmail}>{email}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{height} 厘米</Text>
              <Text style={styles.statLabel}>身高</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{weight} 公斤</Text>
              <Text style={styles.statLabel}>体重</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{age} 岁</Text>
              <Text style={styles.statLabel}>年龄</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={() => setShowEditModal(true)}
          >
            <Text style={styles.editProfileText}>编辑资料</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.goalsSection}>
          <Text style={styles.sectionTitle}>我的目标</Text>
          
          <View style={styles.goalCard}>
            <View style={styles.goalIconContainer}>
              <Zap size={24} color="#FFFFFF" />
            </View>
            <View style={styles.goalInfo}>
              <Text style={styles.goalTitle}>每日卡路里目标</Text>
              <Text style={styles.goalValue}>2,000 卡路里</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '62.5%' }]} />
              </View>
              <Text style={styles.progressText}>已消耗 1,250 / 2,000 卡路里</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>查看所有目标</Text>
            <ChevronRight size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.menuSection}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/screens/meal-history')}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: '#FF9500' }]}>
              <Calendar size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.menuText}>餐食历史</Text>
            <ChevronRight size={20} color="#C7C7CC" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/screens/meal-report')}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: '#5856D6' }]}>
              <BarChart2 size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.menuText}>餐食报告</Text>
            <ChevronRight size={20} color="#C7C7CC" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => router.push('/screens/achievements')}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: '#FF2D55' }]}>
              <Award size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.menuText}>成就</Text>
            <ChevronRight size={20} color="#C7C7CC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIconContainer, { backgroundColor: '#4CD964' }]}>
              <Clock size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.menuText}>禁食计划</Text>
            <ChevronRight size={20} color="#C7C7CC" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.subscriptionCard}>
          <Text style={styles.subscriptionTitle}>升级到高级版</Text>
          <Text style={styles.subscriptionDescription}>获取无限食物扫描、详细营养洞察和个性化餐饮计划。</Text>
          <TouchableOpacity 
            style={styles.subscriptionButton}
            onPress={handleViewSubscription}
          >
            <Text style={styles.subscriptionButtonText}>查看套餐</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#FFFFFF" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>退出登录</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>编辑个人资料</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowEditModal(false)}
              >
                <X size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>身高 (厘米)</Text>
              <TextInput
                style={styles.input}
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                placeholder="请输入身高"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>体重 (公斤)</Text>
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                placeholder="请输入体重"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>年龄</Text>
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                placeholder="请输入年龄"
              />
            </View>

            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleSaveProfile}
            >
              <Text style={styles.saveButtonText}>保存</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Settings Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSettingsModal}
        onRequestClose={() => {
          setShowSettingsModal(false);
          setShowChangePassword(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>设置</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => {
                  setShowSettingsModal(false);
                  setShowChangePassword(false);
                }}
              >
                <X size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            {!showChangePassword ? (
              <>
                <View style={styles.settingsSection}>
                  <View style={styles.avatarSection}>
                    <Image 
                      source={{ uri: avatarUrl }}
                      style={styles.settingsAvatar}
                    />
                    <TouchableOpacity 
                      style={styles.changeAvatarButton}
                      onPress={handleChangeAvatar}
                    >
                      <Camera size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputContainer}>
                    <View style={styles.inputIconContainer}>
                      <User size={20} color="#8E8E93" />
                    </View>
                    <TextInput
                      style={styles.settingsInput}
                      value={name}
                      onChangeText={setName}
                      placeholder="姓名"
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <View style={styles.inputIconContainer}>
                      <Mail size={20} color="#8E8E93" />
                    </View>
                    <TextInput
                      style={styles.settingsInput}
                      value={email}
                      onChangeText={setEmail}
                      placeholder="邮箱"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>

                  <TouchableOpacity 
                    style={styles.changePasswordButton}
                    onPress={() => setShowChangePassword(true)}
                  >
                    <Key size={20} color="#007AFF" />
                    <Text style={styles.changePasswordText}>修改密码</Text>
                    <ChevronRight size={20} color="#C7C7CC" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity 
                  style={styles.saveButton}
                  onPress={handleSaveSettings}
                >
                  <Text style={styles.saveButtonText}>保存</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>当前密码</Text>
                  <TextInput
                    style={styles.input}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    placeholder="请输入当前密码"
                    secureTextEntry
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>新密码</Text>
                  <TextInput
                    style={styles.input}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="请输入新密码（至少6位）"
                    secureTextEntry
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>确认新密码</Text>
                  <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="请再次输入新密码"
                    secureTextEntry
                  />
                </View>

                <View style={styles.passwordButtonsContainer}>
                  <TouchableOpacity 
                    style={styles.cancelButton}
                    onPress={() => setShowChangePassword(false)}
                  >
                    <Text style={styles.cancelButtonText}>取消</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.saveButton}
                    onPress={handleSaveSettings}
                  >
                    <Text style={styles.saveButtonText}>保存</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#000000',
    marginBottom: 5,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E5E5',
    height: '100%',
  },
  editProfileButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  editProfileText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  goalsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 15,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  goalIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  goalValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E5E5',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewAllText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#007AFF',
    marginRight: 5,
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#000000',
    flex: 1,
  },
  subscriptionCard: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  subscriptionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subscriptionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 20,
    lineHeight: 22,
  },
  subscriptionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  subscriptionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#007AFF',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#000000',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsSection: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  avatarSection: {
    position: 'relative',
    marginBottom: 32,
  },
  settingsAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  changeAvatarButton: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    backgroundColor: '#007AFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
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
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#000000',
    width: '100%',
  },
  settingsInput: {
    height: 56,
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    paddingHorizontal: 56,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#000000',
    width: '100%',
  },
  inputIconContainer: {
    position: 'absolute',
    left: 16,
    top: 18,
    zIndex: 1,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    width: '100%',
  },
  changePasswordText: {
    flex: 1,
    marginLeft: 12,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#007AFF',
  },
  passwordButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginRight: 12,
  },
  cancelButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#8E8E93',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginLeft: 12,
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});