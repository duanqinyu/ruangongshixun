import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Plus, ChevronDown } from 'lucide-react-native';
import { useState } from 'react';

export default function ProductsScreen() {
  const [selectedStore, setSelectedStore] = useState('1');
  const [showStoreSelector, setShowStoreSelector] = useState(false);

  const stores = [
    {
      id: '1',
      name: '北京烤鸭店',
      products: [
        {
          id: '1',
          name: '北京烤鸭',
          price: 188,
          status: 'active',
          image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=500',
        },
        {
          id: '2',
          name: '烤鸭套餐',
          price: 288,
          status: 'active',
          image: 'https://images.unsplash.com/photo-1582481725274-d63bdf929a90?w=500',
        },
      ],
    },
    {
      id: '2',
      name: '上海面馆',
      products: [
        {
          id: '3',
          name: '上海小笼包',
          price: 38,
          status: 'active',
          image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500',
        },
        {
          id: '4',
          name: '阳春面',
          price: 22,
          status: 'inactive',
          image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=500',
        },
      ],
    },
  ];

  const selectedStoreData = stores.find(store => store.id === selectedStore);
  const products = selectedStoreData?.products || [];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>商品管理</Text>

        <TouchableOpacity 
          style={styles.storeSelector}
          onPress={() => setShowStoreSelector(!showStoreSelector)}
        >
          <Text style={styles.selectedStoreName}>
            {selectedStoreData?.name || '选择店铺'}
          </Text>
          <ChevronDown size={20} color="#666666" />
        </TouchableOpacity>

        {showStoreSelector && (
          <View style={styles.storeSelectorDropdown}>
            {stores.map(store => (
              <TouchableOpacity
                key={store.id}
                style={[
                  styles.storeSelectorItem,
                  selectedStore === store.id && styles.storeSelectorItemSelected
                ]}
                onPress={() => {
                  setSelectedStore(store.id);
                  setShowStoreSelector(false);
                }}
              >
                <Text style={[
                  styles.storeSelectorItemText,
                  selectedStore === store.id && styles.storeSelectorItemTextSelected
                ]}>
                  {store.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color="#007AFF" />
            <Text style={styles.addButtonText}>新增商品</Text>
          </TouchableOpacity>
        </View>

        {products.map((product) => (
          <TouchableOpacity key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>¥{product.price}</Text>
              <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: product.status === 'active' ? '#4CAF50' : '#FF9800' }]} />
                <Text style={styles.statusText}>{product.status === 'active' ? '已上架' : '已下架'}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  addButtonContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  addButtonText: {
    color: '#007AFF',
    marginLeft: 4,
  },
  storeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5EA',
  },
  selectedStoreName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
  },
  storeSelectorDropdown: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    marginBottom: 16,
  },
  storeSelectorItem: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  storeSelectorItemSelected: {
    backgroundColor: '#F2F2F7',
  },
  storeSelectorItemText: {
    fontSize: 16,
    color: '#000000',
  },
  storeSelectorItemTextSelected: {
    color: '#007AFF',
    fontWeight: '500',
  },
  productCard: {
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
  productImage: {
    width: '100%',
    height: 200,
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
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