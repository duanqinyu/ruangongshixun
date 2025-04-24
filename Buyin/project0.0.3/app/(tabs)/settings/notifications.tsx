import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useState } from 'react';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState({
    newOrders: true,
    orderStatus: true,
    comments: true,
    marketing: false,
    system: true,
    email: true,
    sms: true,
    push: true,
  });

  const toggleSwitch = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>消息类型</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>新订单通知</Text>
          <Switch
            value={notifications.newOrders}
            onValueChange={() => toggleSwitch('newOrders')}
            trackColor={{ false: '#E5E5EA', true: '#34C759' }}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>订单状态更新</Text>
          <Switch
            value={notifications.orderStatus}
            onValueChange={() => toggleSwitch('orderStatus')}
            trackColor={{ false: '#E5E5EA', true: '#34C759' }}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>用户评价</Text>
          <Switch
            value={notifications.comments}
            onValueChange={() => toggleSwitch('comments')}
            trackColor={{ false: '#E5E5EA', true: '#34C759' }}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>营销活动</Text>
          <Switch
            value={notifications.marketing}
            onValueChange={() => toggleSwitch('marketing')}
            trackColor={{ false: '#E5E5EA', true: '#34C759' }}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>系统通知</Text>
          <Switch
            value={notifications.system}
            onValueChange={() => toggleSwitch('system')}
            trackColor={{ false: '#E5E5EA', true: '#34C759' }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>通知方式</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>邮件通知</Text>
          <Switch
            value={notifications.email}
            onValueChange={() => toggleSwitch('email')}
            trackColor={{ false: '#E5E5EA', true: '#34C759' }}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>短信通知</Text>
          <Switch
            value={notifications.sms}
            onValueChange={() => toggleSwitch('sms')}
            trackColor={{ false: '#E5E5EA', true: '#34C759' }}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>应用推送</Text>
          <Switch
            value={notifications.push}
            onValueChange={() => toggleSwitch('push')}
            trackColor={{ false: '#E5E5EA', true: '#34C759' }}
          />
        </View>
      </View>

      <Text style={styles.notice}>
        注：某些重要通知（如安全提醒）将始终发送，不受以上设置影响
      </Text>
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
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666666',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  settingLabel: {
    fontSize: 16,
    color: '#000000',
  },
  notice: {
    fontSize: 12,
    color: '#666666',
    padding: 16,
    textAlign: 'center',
  },
});