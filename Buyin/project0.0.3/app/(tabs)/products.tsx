import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Plus, ChevronDown, Trash2 } from 'lucide-react-native';
import { useState } from 'react';

export default function ProductsScreen() {
  const [selectedStore, setSelectedStore] = useState('1');
  const [showStoreSelector, setShowStoreSelector] = useState(false);

  const stores = [
    {
      id: '1',
      name: '活力健身工作室',
      products: [
        {
          id: '1',
          name: '私教课程套餐',
          price: 1288,
          status: 'active',
          image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500',
        },
        {
          id: '2',
          name: '团体课程月卡',
          price: 688,
          status: 'active',
          image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500',
        },
      ],
    },
    {
      id: '2',
      name: '轻食沙拉吧',
      products: [
        {
          id: '3',
          name: '能量蛋白碗',
          price: 48,
          status: 'active',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
        },
        {
          id: '4',
          name: '轻食午餐套餐',
          price: 68,
          status: 'active',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
        },
      ],
    },
  ];

  const selectedStoreData = stores.find(store => store.id === selectedStore);
  const products = selectedStoreData?.products || [];

  const handleDeleteProduct = (productId: string) => {
    // In a real app, this would make an API call to delete the product
    console.log('Deleting product:', productId);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>商品管理</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.storeSelector}
              onPress={() => setShowStoreSelector(!showStoreSelector)}
            >
              <Text style={styles.storeSelectorText}>
                {selectedStoreData?.name || '选择店铺'}
              </Text>
              <ChevronDown size={20} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={24} color="#007AFF" />
              <Text style={styles.addButtonText}>新增商品</Text>
            </TouchableOpacity>
          </View>
        </View>

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

        {products.map((product) => (
          <TouchableOpacity key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <View style={styles.productHeader}>
                <Text style={styles.productName}>{product.name}</Text>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => handleDeleteProduct(product.id)}
                >
                  <Trash2 size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>
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
  header: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  storeSelectorText: {
    fontSize: 16,
    color: '#007AFF',
    marginRight: 8,
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
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  deleteButton: {
    padding: 4,
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