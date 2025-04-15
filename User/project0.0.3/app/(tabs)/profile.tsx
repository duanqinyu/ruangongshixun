import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, ChevronRight, Award, Calendar, ChartBar as BarChart2, Clock, Zap, LogOut } from 'lucide-react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
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
            // Navigate back to the login screen
            router.replace('/auth/login');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>个人资料</Text>
        <TouchableOpacity>
          <Settings size={24} color="#000000" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80' }} 
            style={styles.profileImage} 
          />
          <Text style={styles.profileName}>张小红</Text>
          <Text style={styles.profileEmail}>zhang.xiaohong@example.com</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>165 厘米</Text>
              <Text style={styles.statLabel}>身高</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>65 公斤</Text>
              <Text style={styles.statLabel}>体重</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>27 岁</Text>
              <Text style={styles.statLabel}>年龄</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editProfileButton}>
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
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIconContainer, { backgroundColor: '#FF9500' }]}>
              <Calendar size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.menuText}>餐食历史</Text>
            <ChevronRight size={20} color="#C7C7CC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIconContainer, { backgroundColor: '#5856D6' }]}>
              <BarChart2 size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.menuText}>营养报告</Text>
            <ChevronRight size={20} color="#C7C7CC" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
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
          <TouchableOpacity style={styles.subscriptionButton}>
            <Text style={styles.subscriptionButtonText}>查看套餐</Text>
          </TouchableOpacity>
        </View>
        
        {/* 退出登录按钮 */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#FFFFFF" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>退出登录</Text>
        </TouchableOpacity>
      </ScrollView>
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
  // 退出登录按钮样式
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
});