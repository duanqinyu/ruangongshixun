import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, ChevronLeft, ChevronRight, X } from 'lucide-react-native';
import { useState, useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameDay } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { router } from 'expo-router';

// Update the mock data to include March dates
const calorieHistory = {
  '2025-03-01': { total: 1850, target: 2000, remaining: 150, meals: [
    { name: '早餐', calories: 450, foods: ['麦片', '牛奶', '香蕉'] },
    { name: '午餐', calories: 750, foods: ['米饭', '清炒西兰花', '鸡胸肉'] },
    { name: '晚餐', calories: 650, foods: ['三明治', '沙拉', '酸奶'] }
  ]},
  '2025-03-05': { total: 2100, target: 2000, remaining: -100, meals: [
    { name: '早餐', calories: 600, foods: ['煎饼', '豆浆', '鸡蛋'] },
    { name: '午餐', calories: 800, foods: ['米饭', '红烧肉', '汤'] },
    { name: '晚餐', calories: 700, foods: ['面条', '炒菜', '水果'] }
  ]},
  '2025-03-10': { total: 1900, target: 2000, remaining: 100, meals: [] },
  '2025-03-15': { total: 2200, target: 2000, remaining: -200, meals: [] },
  '2025-03-20': { total: 1800, target: 2000, remaining: 200, meals: [] },
  '2025-03-25': { total: 2050, target: 2000, remaining: -50, meals: [] },
  '2025-03-28': { total: 1950, target: 2000, remaining: 50, meals: [] }
};

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedDayData, setSelectedDayData] = useState(null);

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
      setSelectedDayData(calorieHistory[dateStr]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.greeting}>你好，用户</Text>
          <Text style={styles.title}>追踪你的卡路里</Text>
        </View>

        {/* 今日摘要 */}
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

        <View style={styles.calendarSection}>
          <Text style={styles.sectionTitle}>每日卡路里</Text>
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
                const isSelected = selectedDayData && isSameDay(date, selectedDate);
                
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dayCell,
                      isSelected && styles.selectedDayCell
                    ]}
                    onPress={() => hasRecord && handleDatePress(date)}
                    disabled={!hasRecord}
                  >
                    <Text style={[
                      styles.dayText,
                      !hasRecord && styles.inactiveDay,
                      isSelected && styles.selectedDayText
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

            {/* Selected Day Summary */}
            {selectedDayData && (
              <View style={styles.selectedDaySummary}>
                <Text style={styles.selectedDayTitle}>
                  {format(selectedDate, 'MM月dd日')} 卡路里摘要
                </Text>
                <View style={styles.selectedDayCalories}>
                  <View style={styles.selectedDayCalorieItem}>
                    <Text style={styles.selectedDayCalorieValue}>
                      {selectedDayData.total}
                    </Text>
                    <Text style={styles.selectedDayCalorieLabel}>已消耗</Text>
                  </View>
                  <View style={styles.selectedDayCalorieItem}>
                    <Text style={styles.selectedDayCalorieValue}>
                      {selectedDayData.target}
                    </Text>
                    <Text style={styles.selectedDayCalorieLabel}>目标</Text>
                  </View>
                  <View style={styles.selectedDayCalorieItem}>
                    <Text style={[
                      styles.selectedDayCalorieValue,
                      { color: selectedDayData.remaining >= 0 ? '#4CD964' : '#FF3B30' }
                    ]}>
                      {Math.abs(selectedDayData.remaining)}
                    </Text>
                    <Text style={styles.selectedDayCalorieLabel}>
                      {selectedDayData.remaining >= 0 ? '剩余' : '超出'}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.goalsSection}>
          <Text style={styles.sectionTitle}>我的目标</Text>
          
          <View style={styles.goalCard}>
            <View style={styles.goalIconContainer}>
              <Plus size={24} color="#FFFFFF" />
            </View>
            <View style={styles.goalInfo}>
              <Text style={styles.goalTitle}>每日卡路里目标</Text>
              <Text style={styles.goalValue}>2,000 卡路里</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '62.5%' }]} />
              </View>
              <Text style={styles.progressText}>已消耗 1,250 / 2,000 卡路里</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push('/screens/goals')}
          >
            <Text style={styles.viewAllText}>查看所有目标</Text>
            <ChevronRight size={20} color="#007AFF" />
          </TouchableOpacity>
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
  selectedDayCell: {
    backgroundColor: '#007AFF20',
    borderRadius: 8,
  },
  dayText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#000000',
  },
  selectedDayText: {
    color: '#007AFF',
    fontFamily: 'Inter-Medium',
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
  selectedDaySummary: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  selectedDayTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 12,
  },
  selectedDayCalories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedDayCalorieItem: {
    flex: 1,
    alignItems: 'center',
  },
  selectedDayCalorieValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 4,
  },
  selectedDayCalorieLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  calendarSection: {
    marginBottom: 20,
  },
  goalsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  goalIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  goalValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E5E5',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewAllText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#007AFF',
    marginRight: 5,
  },
});