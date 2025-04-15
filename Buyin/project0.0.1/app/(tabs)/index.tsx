import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Plus } from 'lucide-react-native';

export default function StoresScreen() {
  const stores = [
    {
      id: '1',
      name: '北京烤鸭店',
      address: '北京市朝阳区建国路88号',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500',
    },
    {
      id: '2',
      name: '上海面馆',
      address: '上海市静安区南京西路100号',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>我的店铺</Text>
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
              <Text style={styles.storeAddress}>{store.address}</Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
  storeAddress: {
    fontSize: 14,
    color: '#666666',
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