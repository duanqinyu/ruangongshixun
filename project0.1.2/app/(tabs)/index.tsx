import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react-native';

export default function HomeScreen() {
  // Check if user is admin
  const isAdmin = localStorage.getItem('userType') === 'admin';

  // If admin, return the original admin dashboard
  if (isAdmin) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Original admin dashboard content */}
      </SafeAreaView>
    );
  }

  // User view
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.greeting}>你好，用户</Text>
          <Text style={styles.title}>追踪你的卡路里</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.cardTitle}>今日摘要</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1,250</Text>
              <Text style={styles.statLabel}>已消耗</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2,000</Text>
              <Text style={styles.statLabel}>目标</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#007AFF' }]}>750</Text>
              <Text style={styles.statLabel}>剩余</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>今日餐食</Text>
          <View style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealType}>早餐</Text>
              <Text style={styles.calories}>615 卡路里</Text>
            </View>
            <Text style={styles.foodName}>蓝莓糖浆煎饼</Text>
            <View style={styles.nutritionInfo}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>碳水</Text>
                <Text style={styles.nutritionValue}>93克</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>蛋白质</Text>
                <Text style={styles.nutritionValue}>11克</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>脂肪</Text>
                <Text style={styles.nutritionValue}>21克</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color="#FFFFFF" />
            <Text style={styles.addButtonText}>添加餐食</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>每日卡路里</Text>
          <View style={styles.calendarCard}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity>
                <ChevronLeft size={24} color="#000000" />
              </TouchableOpacity>
              <Text style={styles.calendarTitle}>2025年 03月</Text>
              <TouchableOpacity>
                <ChevronRight size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            <View style={styles.calendarGrid}>
              <Text style={styles.weekday}>日</Text>
              <Text style={styles.weekday}>一</Text>
              <Text style={styles.weekday}>二</Text>
              <Text style={styles.weekday}>三</Text>
              <Text style={styles.weekday}>四</Text>
              <Text style={styles.weekday}>五</Text>
              <Text style={styles.weekday}>六</Text>
            </View>
            {/* Calendar days would be dynamically generated here */}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>最近食物</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentFoods}>
            <View style={styles.foodCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80' }}
                style={styles.foodImage}
              />
              <Text style={styles.foodCardName}>煎饼</Text>
              <Text style={styles.foodCardCalories}>595 卡路里</Text>
            </View>
            <View style={styles.foodCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80' }}
                style={styles.foodImage}
              />
              <Text style={styles.foodCardName}>蓝莓</Text>
              <Text style={styles.foodCardCalories}>8 卡路里</Text>
            </View>
            <View style={styles.foodCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80' }}
                style={styles.foodImage}
              />
              <Text style={styles.foodCardName}>糖浆</Text>
              <Text style={styles.foodCardCalories}>12 卡路里</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#000000',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  mealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealType: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#8E8E93',
  },
  calories: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#007AFF',
  },
  foodName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 16,
  },
  nutritionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  nutritionValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#000000',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  calendarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
  },
  calendarGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekday: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    width: 32,
    textAlign: 'center',
  },
  recentFoods: {
    paddingHorizontal: 20,
  },
  foodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 12,
    padding: 12,
    width: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  foodImage: {
    width: '100%',
    height: 96,
    borderRadius: 8,
    marginBottom: 8,
  },
  foodCardName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#000000',
    marginBottom: 4,
  },
  foodCardCalories: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
});