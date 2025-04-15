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
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color="#007AFF" />
            <Text style={styles.addButtonText}>新增店铺</Text>
          </TouchableOpacity>
        </View>

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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    padding: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#007AFF',
    marginLeft: 4,
  },
  storeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  storeImage: {
    width: '100%',
    height: 200,
  },
  storeInfo: {
    padding: 16,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  storeSales: {
    fontSize: 16,
    color: '#FF3B30',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#666666',
  },
});