import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Plus } from 'lucide-react-native';

export default function StoresScreen() {
  const stores = [
    {
      id: '1',
      name: '活力健身工作室',
      dailySales: 12580,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
    },
    {
      id: '2',
      name: '轻食沙拉吧',
      dailySales: 8960,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
    },
    {
      id: '3',
      name: '瑜伽禅修馆',
      dailySales: 15280,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=500',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>店铺管理</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#007AFF" />
          <Text style={styles.addButtonText}>新增店铺</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {stores.map((store) => (
          <TouchableOpacity key={store.id} style={styles.storeCard}>
            <Image source={{ uri: store.image }} style={styles.storeImage} />
            <View style={styles.storeInfo}>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.storeSales}>今日销售额: ¥{store.dailySales.toLocaleString()}</Text>
              <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: store.status === 'active' ? '#4CAF50' : '#FF9800' }]} />
                <Text style={styles.statusText}>{store.status === 'active' ? '营业中' : '已关闭'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 4,
  },
  scrollView: {
    flex: 1,
  },
  storeCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  storeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  storeInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  storeSales: {
    fontSize: 14,
    color: '#48484A',
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#48484A',
  },
});