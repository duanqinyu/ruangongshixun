import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronRight, Shield, Smartphone, Key, Bell } from 'lucide-react-native';

export default function SecurityScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Key size={24} color="#007AFF" style={styles.menuItemIcon} />
            <View>
              <Text style={styles.menuItemTitle}>修改密码</Text>
              <Text style={styles.menuItemDescription}>定期更新密码以确保账号安全</Text>
            </View>
          </View>
          <ChevronRight size={20} color="#8E8E93" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Smartphone size={24} color="#FF9500" style={styles.menuItemIcon} />
            <View>
              <Text style={styles.menuItemTitle}>手机绑定</Text>
              <Text style={styles.menuItemDescription}>已绑定：138****8000</Text>
            </View>
          </View>
          <ChevronRight size={20} color="#8E8E93" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Bell size={24} color="#34C759" style={styles.menuItemIcon} />
            <View>
              <Text style={styles.menuItemTitle}>安全提醒</Text>
              <Text style={styles.menuItemDescription}>异常登录提醒、敏感操作提醒</Text>
            </View>
          </View>
          <ChevronRight size={20} color="#8E8E93" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Shield size={24} color="#FF3B30" style={styles.menuItemIcon} />
            <View>
              <Text style={styles.menuItemTitle}>登录设备管理</Text>
              <Text style={styles.menuItemDescription}>查看并管理已登录设备</Text>
            </View>
          </View>
          <ChevronRight size={20} color="#8E8E93" />
        </TouchableOpacity>
      </View>

      <View style={styles.securityTipsContainer}>
        <Text style={styles.securityTipsTitle}>安全提示</Text>
        <View style={styles.securityTip}>
          <Text style={styles.tipNumber}>1</Text>
          <Text style={styles.tipText}>定期更改密码，不要使用简单密码</Text>
        </View>
        <View style={styles.securityTip}>
          <Text style={styles.tipNumber}>2</Text>
          <Text style={styles.tipText}>请勿在不安全的环境下登录账号</Text>
        </View>
        <View style={styles.securityTip}>
          <Text style={styles.tipNumber}>3</Text>
          <Text style={styles.tipText}>不要将账号密码告诉他人</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 20,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    marginRight: 16,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
  securityTipsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    padding: 16,
  },
  securityTipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  securityTip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipNumber: {
    width: 20,
    height: 20,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 20,
    marginRight: 8,
    fontSize: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#666666',
  },
});