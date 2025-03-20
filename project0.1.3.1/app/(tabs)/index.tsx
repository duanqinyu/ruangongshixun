import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, ChevronLeft, ChevronRight, Users, TrendingUp, Settings } from 'lucide-react-native';
import { useState } from 'react';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

// Types for calendar data
type CalendarEntry = {
  calories: number;
  target: number;
};

type CalendarData = {
  [key: string]: CalendarEntry;
};

// Mock data for calendar entries
const calendarData: CalendarData = {
  '2025-03-01': { calories: 1800, target: 2000 },
  '2025-03-05': { calories: 2100, target: 2000 },
  '2025-03-10': { calories: 1950, target: 2000 },
  '2025-03-15': { calories: 2200, target: 2000 },
  '2025-03-20': { calories: 1900, target: 2000 },
  '2025-03-25': { calories: 2150, target: 2000 },
  '2025-03-28': { calories: 1850, target: 2000 },
  // Add more months for testing
  '2025-02-15': { calories: 1900, target: 2000 },
  '2025-04-10': { calories: 2000, target: 2000 },
};

// 获取屏幕宽度
const screenWidth = Dimensions.get('window').width;

// 周数据
const weekData = {
  labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  datasets: [{
    data: [2100, 1950, 2300, 2000, 2400, 1800, 2200],
  }]
};

// 月度注册数据
const monthlyRegistrations = {
  labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
  datasets: [{
    data: [20, 45, 28, 80, 99, 43],
  }]
};

// 活跃度数据
const activityData = [
  {
    name: '活跃用户',
    population: 75,
    color: '#34C759',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: '非活跃用户',
    population: 25,
    color: '#FF3B30',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
];

export default function HomeScreen() {
  // Check if user is admin
  const isAdmin = localStorage.getItem('userType') === 'admin';
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2)); // March 2025

  // Function to get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Function to get first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    setSelectedDate(null);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = getDaysInMonth(year, month);
    const firstDayOfWeek = getFirstDayOfMonth(year, month);

    // Add empty cells for days before the 1st
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(
        <View key={`empty-${i}`} style={styles.dayContainer}>
          <Text style={styles.calendarDay}></Text>
        </View>
      );
    }

    // Add actual days
    for (let i = 1; i <= totalDays; i++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayData = calendarData[dateString];
      const isSelected = selectedDate === dateString;

      const dayStyle = [
        styles.calendarDay,
        dayData && {
          color: '#000000',
        },
        isSelected && styles.selectedDay,
      ];

      const dotStyle = [
        styles.calendarDot,
        dayData && (dayData.calories > dayData.target ? styles.overDot : styles.underDot),
      ];

      days.push(
        <TouchableOpacity
          key={i}
          style={styles.dayContainer}
          onPress={() => dayData && setSelectedDate(dateString)}
          disabled={!dayData}
        >
          <Text style={dayStyle}>{i}</Text>
          {dayData && <View style={dotStyle} />}
        </TouchableOpacity>
      );
    }

    return days;
  };

  // If admin, return the admin dashboard
  if (isAdmin) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>管理员仪表盘</Text>
            <Text style={styles.headerSubtitle}>数据分析与用户洞察</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#E3F2FF' }]}>
                <Users size={20} color="#007AFF" />
              </View>
              <Text style={styles.statValue}>2,547</Text>
              <Text style={styles.statLabel}>总用户数</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#E8FAE8' }]}>
                <Users size={20} color="#34C759" />
              </View>
              <Text style={styles.statValue}>1,890</Text>
              <Text style={styles.statLabel}>活跃用户</Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#FFF5EB' }]}>
                <TrendingUp size={20} color="#FF9500" />
              </View>
              <Text style={styles.statValue}>75%</Text>
              <Text style={styles.statLabel}>活跃率</Text>
            </View>
          </View>

          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>用户餐食指标分析</Text>
            <Text style={styles.chartSubtitle}>过去7天平均卡路里摄入量</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chartScrollContent}
            >
              <LineChart
                data={{
                  labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                  datasets: [{
                    data: [2100, 1950, 2300, 2000, 2400, 1800, 2200]
                  }]
                }}
                width={screenWidth * 0.9} 
                height={220}
                chartConfig={{
                  backgroundColor: '#FFFFFF',
                  backgroundGradientFrom: '#FFFFFF',
                  backgroundGradientTo: '#FFFFFF',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                  labelColor: () => '#007AFF',
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#007AFF"
                  },
                  fillShadowGradient: '#E3F2FF',
                  fillShadowGradientOpacity: 0.6,
                  count: 6,
                }}
                bezier
                style={styles.chart}
                withVerticalLines={false}
                segments={6}
                withHorizontalLabels={true}
              />
            </ScrollView>
          </View>

          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>用户注册量分析</Text>
            <Text style={styles.chartSubtitle}>近6个月新增用户数量</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chartScrollContent}
            >
              <BarChart
                data={{
                  labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
                  datasets: [{
                    data: [20, 45, 26, 80, 99, 43]
                  }]
                }}
                width={screenWidth * 0.9} 
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                  backgroundColor: '#FFFFFF',
                  backgroundGradientFrom: '#FFFFFF',
                  backgroundGradientTo: '#FFFFFF',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                  labelColor: () => '#007AFF',
                  style: {
                    borderRadius: 16,
                  },
                  barPercentage: 0.85, 
                  count: 6,
                }}
                style={styles.chart}
                showValuesOnTopOfBars={true}
                fromZero={true}
                withInnerLines={true}
                segments={6}
                withHorizontalLabels={true}
              />
            </ScrollView>
          </View>

          <View style={styles.chartSection}>
            <Text style={styles.chartTitle}>用户活跃度分析</Text>
            <Text style={styles.chartSubtitle}>活跃与非活跃用户比例</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chartScrollContent}
            >
              <PieChart
                data={activityData}
                width={screenWidth * 0.9}
                height={220}
                chartConfig={{
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Get selected day's data
  const selectedDayData = selectedDate ? calendarData[selectedDate] : null;

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
              <TouchableOpacity onPress={handlePrevMonth}>
                <ChevronLeft size={24} color="#000000" />
              </TouchableOpacity>
              <Text style={styles.calendarTitle}>
                {currentDate.getFullYear()}年 {String(currentDate.getMonth() + 1).padStart(2, '0')}月
              </Text>
              <TouchableOpacity onPress={handleNextMonth}>
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
            <View style={styles.calendarDays}>
              {generateCalendarDays()}
            </View>
            {selectedDayData && (
              <View style={styles.selectedDayInfo}>
                <Text style={styles.selectedDayTitle}>
                  {selectedDate?.split('-')[2]}日 卡路里摘要
                </Text>
                <View style={styles.selectedDayStats}>
                  <View style={styles.selectedDayStat}>
                    <Text style={styles.selectedDayValue}>{selectedDayData.calories}</Text>
                    <Text style={styles.selectedDayLabel}>已消耗</Text>
                  </View>
                  <View style={styles.selectedDayStat}>
                    <Text style={styles.selectedDayValue}>{selectedDayData.target}</Text>
                    <Text style={styles.selectedDayLabel}>目标</Text>
                  </View>
                  <View style={styles.selectedDayStat}>
                    <Text style={[
                      styles.selectedDayValue,
                      { color: selectedDayData.calories > selectedDayData.target ? '#FF3B30' : '#34C759' }
                    ]}>
                      {Math.abs(selectedDayData.calories - selectedDayData.target)}
                    </Text>
                    <Text style={styles.selectedDayLabel}>
                      {selectedDayData.calories > selectedDayData.target ? '超出' : '剩余'}
                    </Text>
                  </View>
                </View>
              </View>
            )}
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
    backgroundColor: '#F5F5F7',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    width: '31%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
  },
  chartSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 16,
  },
  chartScrollContent: {
    paddingRight: 16,
  },
  chart: {
    borderRadius: 8,
  },
  calendarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  weekday: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  calendarDays: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayContainer: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarDay: {
    fontSize: 16,
    color: '#8E8E93',
  },
  selectedDay: {
    color: '#FFFFFF',
    backgroundColor: '#007AFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    textAlign: 'center',
    lineHeight: 32,
    overflow: 'hidden',
  },
  calendarDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 4,
  },
  overDot: {
    backgroundColor: '#FF3B30',
  },
  underDot: {
    backgroundColor: '#34C759',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  mealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  calories: {
    fontSize: 14,
    color: '#666666',
  },
  foodName: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 12,
  },
  nutritionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  selectedDayInfo: {
    marginTop: 16,
    padding: 16,
  },
  selectedDayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  selectedDayStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedDayStat: {
    alignItems: 'center',
  },
  selectedDayValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  selectedDayLabel: {
    fontSize: 14,
    color: '#666666',
  },
  foodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 120,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  foodCardName: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 4,
  },
  foodCardCalories: {
    fontSize: 12,
    color: '#666666',
  },
  recentFoods: {
    padding: 16,
  },
});