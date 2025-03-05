import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, ChevronLeft, ChevronRight, X } from 'lucide-react-native';
import { useState, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from 'date-fns';
import { zhCN } from 'date-fns/locale';

// Mock data for calorie history
const calorieHistory = {
  '2024-02-01': { total: 1800, meals: [
    { name: '早餐', calories: 500, foods: ['燕麦片', '牛奶', '香蕉'] },
    { name: '午餐', calories: 700, foods: ['米饭', '炒青菜', '鱼'] },
    { name: '晚餐', calories: 600, foods: ['全麦面包', '沙拉', '鸡胸肉'] }
  ]},
  '2024-02-03': { total: 2100, meals: [
    { name: '早餐', calories: 600, foods: ['煎饼', '豆浆', '鸡蛋'] },
    { name: '午餐', calories: 800, foods: ['米饭', '红烧肉', '汤'] },
    { name: '晚餐', calories: 700, foods: ['面条', '炒菜', '水果'] }
  ]},
  '2024-02-05': { total: 1950, meals: [] },
  '2024-02-07': { total: 2300, meals: [] },
  '2024-02-10': { total: 1750, meals: [] },
  '2024-02-12': { total: 2050, meals: [] },
};

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const previousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  const getCalorieColor = (calories: number) => {
    if (calories < 1800) return '#4CD964';
    if (calories < 2000) return '#FFCC00';
    return '#FF3B30';
  };

  const handleDatePress = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    if (calorieHistory[dateStr]) {
      setSelectedDate(date);
      setShowModal(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.greeting}>你好，用户</Text>
          <Text style={styles.title}>追踪你的卡路里</Text>
        </View>

        <View style={styles.mealsSection}>
          <Text style={styles.sectionTitle}>今日餐食</Text>
          
          <View style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealType}>早餐</Text>
              <Text style={styles.mealCalories}>615 卡路里</Text>
            </View>
            <View style={styles.mealItem}>
              <Text style={styles.mealName}>蓝莓糖浆煎饼</Text>
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
          </View>
          
          <TouchableOpacity style={styles.addMealButton}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addMealText}>添加餐食</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>今日摘要</Text>
          <View style={styles.calorieInfo}>
            <View style={styles.calorieCount}>
              <Text style={styles.calorieNumber}>1,250</Text>
              <Text style={styles.calorieLabel}>已消耗</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.calorieCount}>
              <Text style={styles.calorieNumber}>2,000</Text>
              <Text style={styles.calorieLabel}>目标</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.calorieCount}>
              <Text style={styles.calorieNumber}>750</Text>
              <Text style={styles.calorieLabel}>剩余</Text>
            </View>
          </View>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <View style={styles.monthSelector}>
              <TouchableOpacity onPress={previousMonth} style={styles.monthButton}>
                <ChevronLeft size={20} color="#000000" />
              </TouchableOpacity>
              <Text style={styles.monthText}>
                {format(currentMonth, 'yyyy年 MM月', { locale: zhCN })}
              </Text>
              <TouchableOpacity onPress={nextMonth} style={styles.monthButton}>
                <ChevronRight size={20} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.weekDays}>
            {['日', '一', '二', '三', '四', '五', '六'].map((day, index) => (
              <Text key={index} style={styles.weekDay}>{day}</Text>
            ))}
          </View>
          
          <View style={styles.daysGrid}>
            {Array(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()).fill(null).map((_, index) => (
              <View key={`empty-${index}`} style={styles.dayCell} />
            ))}
            {days.map((date, index) => {
              const dateStr = format(date, 'yyyy-MM-dd');
              const dayData = calorieHistory[dateStr];
              const hasRecord = !!dayData;
              
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.dayCell]}
                  onPress={() => hasRecord && handleDatePress(date)}
                  disabled={!hasRecord}
                >
                  <Text style={[
                    styles.dayText,
                    !hasRecord && styles.inactiveDay
                  ]}>
                    {format(date, 'd')}
                  </Text>
                  {hasRecord && (
                    <View style={[
                      styles.calorieIndicator,
                      { backgroundColor: getCalorieColor(dayData.total) }
                    ]} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>最近食物</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentScrollView}>
            {[
              { name: '煎饼', calories: 595, image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80' },
              { name: '蓝莓', calories: 8, image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80' },
              { name: '糖浆', calories: 12, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80' },
              { name: '咖啡', calories: 5, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80' },
            ].map((item, index) => (
              <View key={index} style={styles.recentItem}>
                <Image source={{ uri: item.image }} style={styles.recentImage} />
                <Text style={styles.recentName}>{item.name}</Text>
                <Text style={styles.recentCalories}>{item.calories} 卡路里</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {format(selectedDate, 'MM月dd日')} 卡路里记录
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowModal(false)}
              >
                <X size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            {calorieHistory[format(selectedDate, 'yyyy-MM-dd')] && (
              <>
                <View style={styles.modalTotalCalories}>
                  <Text style={styles.modalTotalLabel}>总卡路里</Text>
                  <Text style={[
                    styles.modalTotalValue,
                    { color: getCalorieColor(calorieHistory[format(selectedDate, 'yyyy-MM-dd')].total) }
                  ]}>
                    {calorieHistory[format(selectedDate, 'yyyy-MM-dd')].total}
                  </Text>
                </View>

                <ScrollView style={styles.modalMealsList}>
                  {calorieHistory[format(selectedDate, 'yyyy-MM-dd')].meals.map((meal, index) => (
                    <View key={index} style={styles.modalMealItem}>
                      <View style={styles.modalMealHeader}>
                        <Text style={styles.modalMealName}>{meal.name}</Text>
                        <Text style={styles.modalMealCalories}>{meal.calories} 卡路里</Text>
                      </View>
                      <View style={styles.modalFoodsList}>
                        {meal.foods.map((food, foodIndex) => (
                          <Text key={foodIndex} style={styles.modalFoodItem}>• {food}</Text>
                        ))}
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    paddingBottom: 10,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#000000',
    marginTop: 4,
  },
  calendarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calendarHeader: {
    marginBottom: 10,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthButton: {
    padding: 8,
  },
  monthText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
  },
  weekDays: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#8E8E93',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100/7}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  dayText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#000000',
  },
  inactiveDay: {
    color: '#C7C7CC',
  },
  calorieIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 2,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 15,
  },
  calorieInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calorieCount: {
    flex: 1,
    alignItems: 'center',
  },
  calorieNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#007AFF',
  },
  calorieLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E5E5',
  },
  mealsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 15,
  },
  mealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  mealType: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
  },
  mealCalories: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#007AFF',
  },
  mealItem: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 10,
  },
  mealName: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: '#000000',
    marginBottom: 8,
  },
  nutritionInfo: {
    flexDirection: 'row',
  },
  nutritionItem: {
    marginRight: 20,
  },
  nutritionLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#8E8E93',
  },
  nutritionValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#000000',
    marginTop: 2,
  },
  addMealButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  addMealText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  recentSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  recentScrollView: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  recentItem: {
    width: 120,
    marginRight: 15,
  },
  recentImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  recentName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#000000',
  },
  recentCalories: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#8E8E93',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#000000',
  },
  closeButton: {
    padding: 8,
  },
  modalTotalCalories: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTotalLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 5,
  },
  modalTotalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
  },
  modalMealsList: {
    maxHeight: 400,
  },
  modalMealItem: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  modalMealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalMealName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
  },
  modalMealCalories: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#007AFF',
  },
  modalFoodsList: {
    paddingLeft: 5,
  },
  modalFoodItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 5,
  },
});