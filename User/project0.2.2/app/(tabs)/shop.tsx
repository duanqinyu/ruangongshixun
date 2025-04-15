import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity, Pressable, Modal } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const categories = [
  { id: 1, name: '推荐' },
  { id: 2, name: '运动器械' },
  { id: 3, name: '营养补剂' },
  { id: 4, name: '运动装备' },
  { id: 5, name: '健康食品' },
  { id: 6, name: '瑜伽用品' },
  { id: 7, name: '训练配件' },
  { id: 8, name: '智能设备' },
  { id: 9, name: '运动饮品' },
  { id: 10, name: '健身服饰' },
  { id: 11, name: '跑步装备' },
  { id: 12, name: '力量训练' },
  { id: 13, name: '体重管理' },
  { id: 14, name: '恢复装备' },
  { id: 15, name: '运动鞋袜' },
  { id: 16, name: '户外健身' },
];

const products = [
  {
    id: 1,
    title: '多功能智能跑步机',
    subtitle: '静音可折叠 家用健身',
    image: 'https://img.freepik.com/free-photo/treadmill-gym_1203-3656.jpg',
    price: 2999,
    originalPrice: 3599,
    sales: '2.1万件',
    rating: '95%',
    tag: '限时特惠',
  },
  {
    id: 2,
    title: '乳清蛋白粉健身增肌',
    subtitle: '优质蛋白 增肌增重',
    image: 'https://img.freepik.com/free-photo/protein-powder-with-vanilla-flavor_1150-28711.jpg',
    price: 258,
    sales: '1.5万件',
    rating: '97%',
    tag: '正品保障',
    badge: '官方认证',
  },
  {
    id: 3,
    title: '专业瑜伽垫防滑',
    subtitle: 'NBR材质 加厚加宽',
    image: 'https://img.freepik.com/free-photo/pink-yoga-mat-white_53876-96592.jpg',
    price: 99,
    originalPrice: 129,
    sales: '3.2万件',
    tag: '爆款推荐',
    promotion: '满99减20',
  },
  {
    id: 4,
    title: '可调节哑铃组合',
    subtitle: '10-40kg 快速调节',
    image: 'https://img.freepik.com/free-photo/dumbbells-floor-gym_1150-19311.jpg',
    price: 499,
    sales: '8000件',
    rating: '94%',
    tag: '热销爆款',
  },
  {
    id: 5,
    title: '运动健身套装女',
    subtitle: '弹力速干 高腰显瘦',
    image: 'https://img.freepik.com/free-photo/woman-sportswear-white_1150-12588.jpg',
    price: 168,
    originalPrice: 198,
    sales: '1.2万件',
    tag: '新品上市',
  },
  {
    id: 6,
    title: '健身蛋白能量棒',
    subtitle: '低糖低脂 补充能量',
    image: 'https://img.freepik.com/free-photo/protein-bars-with-different-flavors_23-2148049777.jpg',
    price: 99,
    sales: '2.5万件',
    rating: '96%',
    tag: '营养补充',
    promotion: '买2送1',
  }
];

export default function ShopScreen() {
  const [selectedCategory, setSelectedCategory] = useState('推荐');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* 搜索栏 */}
      <View style={styles.header}>
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="搜索商品"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>搜索</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cartButton}>
          <Ionicons name="cart-outline" size={24} color="#333" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>降价</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 分类选项 - 仅在未展开时显示 */}
      {!showAllCategories && (
        <View style={styles.categoriesWrapper}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.name && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.name)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.name && styles.categoryTextActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity 
            style={styles.expandButton}
            onPress={() => setShowAllCategories(true)}
          >
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      )}

      {/* 展开的分类面板 */}
      {showAllCategories && (
        <View style={styles.modalOverlay}>
          <View style={styles.categoriesModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>全部分类</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowAllCategories(false)}
              >
                <Ionicons name="chevron-up" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={styles.categoryGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.gridCategory,
                    selectedCategory === category.name && styles.gridCategoryActive
                  ]}
                  onPress={() => {
                    setSelectedCategory(category.name);
                    setShowAllCategories(false);
                  }}
                >
                  <Text style={[
                    styles.gridCategoryText,
                    selectedCategory === category.name && styles.gridCategoryTextActive
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* 产品列表 */}
      <ScrollView style={styles.productsContainer}>
        <View style={styles.productGrid}>
          {products.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productCard}>
              <Image 
                source={{ uri: product.image }} 
                style={styles.productImage}
                resizeMode="cover"
              />
              {product.tag && (
                <View style={styles.tagContainer}>
                  <Text style={styles.tagText}>{product.tag}</Text>
                </View>
              )}
              {product.badge && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{product.badge}</Text>
                </View>
              )}
              <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={2}>
                  {product.title}
                </Text>
                <Text style={styles.productSubtitle} numberOfLines={1}>
                  {product.subtitle}
                </Text>
                <View style={styles.productBottom}>
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceSymbol}>¥</Text>
                    <Text style={styles.price}>{product.price}</Text>
                    {product.originalPrice && (
                      <Text style={styles.originalPrice}>¥{product.originalPrice}</Text>
                    )}
                  </View>
                  <View style={styles.salesContainer}>
                    <Text style={styles.salesText}>已售{product.sales}</Text>
                    {product.rating && (
                      <Text style={styles.ratingText}>好评{product.rating}</Text>
                    )}
                  </View>
                  {product.promotion && (
                    <View style={styles.promotionContainer}>
                      <Text style={styles.promotionText}>{product.promotion}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    height: 52,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    borderWidth: 1,
    borderColor: '#ff4d4f',
    borderRadius: 50,
    backgroundColor: '#fff',
    marginRight: 8,
    paddingRight: 2,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    height: '100%',
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    padding: 0,
    height: '100%',
  },
  searchButton: {
    backgroundColor: '#ff4d4f',
    paddingHorizontal: 20,
    height: 32,
    justifyContent: 'center',
    borderRadius: 16,
    marginVertical: 1,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  cartButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: -8,
    top: -6,
    backgroundColor: '#ff4d4f',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
  },
  categoriesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  categoriesContainer: {
    flexGrow: 0,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 16,
  },
  categoryButtonActive: {
    backgroundColor: 'transparent',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
  categoryTextActive: {
    color: '#333',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    paddingBottom: 4,
  },
  expandButton: {
    padding: 8,
    marginRight: 8,
  },
  modalOverlay: {
    position: 'absolute',
    top: 52, // 与header高度一致
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    zIndex: 100,
  },
  categoriesModal: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingBottom: 16,
    paddingTop: 0, // 移除顶部内边距
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 15,
    color: '#333',
  },
  closeButton: {
    padding: 8,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingTop: 12,
  },
  gridCategory: {
    width: '25%',
    paddingHorizontal: 4,
    paddingVertical: 5,
  },
  gridCategoryActive: {
    backgroundColor: 'transparent',
  },
  gridCategoryText: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 24,
    overflow: 'hidden',
  },
  gridCategoryTextActive: {
    color: '#333',
    backgroundColor: '#ffe4e6',
  },
  productsContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  productCard: {
    width: '48.5%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    marginHorizontal: '0.75%',
    overflow: 'hidden',
    elevation: 2,
  },
  productImage: {
    width: '100%',
    aspectRatio: 1,
  },
  tagContainer: {
    position: 'absolute',
    left: 0,
    top: 8,
    backgroundColor: '#ff4d4f',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
  },
  badgeContainer: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
  productInfo: {
    padding: 8,
  },
  productTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    lineHeight: 18,
  },
  productSubtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  productBottom: {
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  priceSymbol: {
    fontSize: 12,
    color: '#ff4d4f',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#ff4d4f',
    fontWeight: 'bold',
    marginRight: 4,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  salesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  salesText: {
    fontSize: 12,
    color: '#999',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#999',
  },
  promotionContainer: {
    marginTop: 4,
    backgroundColor: '#fff1f0',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  promotionText: {
    fontSize: 12,
    color: '#ff4d4f',
  },
});
