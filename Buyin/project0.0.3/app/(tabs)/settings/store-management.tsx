import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronRight, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function StoreManagementScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>入驻申请</Text>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.storeName}>新店铺申请</Text>
            <Text style={styles.statusPending}>审核中</Text>
          </View>
          <Text style={styles.storeAddress}>上海市浦东新区张江高科技园区</Text>
          <Text style={styles.submitTime}>提交时间：2024-01-15 14:30</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>已入驻店铺</Text>
        <TouchableOpacity style={styles.storeItem}>
          <View style={styles.storeInfo}>
            <Text style={styles.storeName}>活力健身工作室</Text>
            <Text style={styles.storeAddress}>上海市徐汇区天钥桥路123号</Text>
          </View>
          <ChevronRight size={20} color="#666666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.storeItem}>
          <View style={styles.storeInfo}>
            <Text style={styles.storeName}>轻食沙拉吧</Text>
            <Text style={styles.storeAddress}>上海市静安区南京西路456号</Text>
          </View>
          <ChevronRight size={20} color="#666666" />
        </TouchableOpacity>
      </View>

      <View style={styles.warningSection}>
        <AlertCircle size={20} color="#FF9500" />
        <Text style={styles.warningText}>
          注意：店铺一旦退出平台，相关数据将无法恢复
        </Text>
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
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666666',
    marginVertical: 16,
  },
  card: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusPending: {
    color: '#FF9500',
    fontSize: 14,
  },
  storeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  storeAddress: {
    fontSize: 14,
    color: '#666666',
  },
  submitTime: {
    fontSize: 12,
    color: '#999999',
    marginTop: 8,
  },
  warningSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9EC',
    margin: 20,
    padding: 16,
    borderRadius: 8,
  },
  warningText: {
    marginLeft: 8,
    color: '#FF9500',
    flex: 1,
  },
});