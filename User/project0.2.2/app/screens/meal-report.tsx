import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronDown } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { zhCN } from 'date-fns/locale';

// Mock data for nutrition reports
const weeklyData = {
  totalCalories: 14500,
  avgCalories: 2071,
  nutrition: {
    carbs: { total: 1645, avg: 235, percentage: 45 },
    protein: { total: 910, avg: 130, percentage: 25 },
    fats: { total: 473, avg: 67.5, percentage: 30 }
  },
  topFoods: [
    { name: '米饭', frequency: 12, calories: 1800 },
    { name: '鸡胸肉', frequency: 8, calories: 1200 },
    { name: '西兰花', frequency: 7, calories: 350 },
    { name: '全麦面包', frequency: 6, calories: 900 },
    { name: '牛奶', frequency: 5, calories: 750 }
  ],
  dailyCalories: Array.from({ length: 7 }, (_, i) => ({
    date: subDays(new Date(), i),
    calories: 1800 + Math.random() * 600
  })).reverse()
};

const monthlyData = {
  totalCalories: 62000,
  avgCalories: 2066,
  nutrition: {
    carbs: { total: 7130, avg: 237, percentage: 46 },
    protein: { total: 3720, avg: 124, percentage: 24 },
    fats: { total: 2015, avg: 67, percentage: 30 }
  },
  topFoods: [
    { name: '米饭', frequency: 45, calories: 6750 },
    { name: '鸡胸肉', frequency: 30, calories: 4500 },
    { name: '西兰花', frequency: 28, calories: 1400 },
    { name: '全麦面包', frequency: 25, calories: 3750 },
    { name: '牛奶', frequency: 22, calories: 3300 }
  ],
  dailyCalories: Array.from({ length: 30 }, (_, i) => ({
    date: subDays(new Date(), i),
    calories: 1800 + Math.random() * 600
  })).reverse()
};

type Period = 'week' | 'month';

export default function MealReportScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('week');
  const data = selectedPeriod === 'week' ? weeklyData : monthlyData;
  
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 40; // 40 for padding
  const chartHeight = 200;
  
  const maxCalories = Math.max(...data.dailyCalories.map(d => d.calories));
  
  const renderChart = () => {
    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartBars}>
          {data.dailyCalories.map((day, index) => {
            const barHeight = (day.calories / maxCalories) * chartHeight;
            return (
              <View key={index} style={styles.barContainer}>
                <View 
                  style={[
                    styles.bar, 
                    { 
                      height: barHeight,
                      backgroundColor: day.calories > 2200 ? '#FF3B30' : 
                                     day.calories < 1800 ? '#FFCC00' : 
                                     '#4CD964'
                    }
                  ]} 
                />
                <Text style={styles.barDate}>
                  {format(day.date, selectedPeriod === 'week' ? 'EEE' : 'd', { locale: zhCN })}
                </Text>
              </View>
            );
          })}
        </View>
        
        <View style={styles.chartLines}>
          <Text style={styles.chartLabel}>2200</Text>
          <Text style={styles.chartLabel}>2000</Text>
          <Text style={styles.chartLabel}>1800</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.title}>餐食报告</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.periodSelector}>
          <TouchableOpacity 
            style={[styles.periodButton, selectedPeriod === 'week' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('week')}
          >
            <Text style={[styles.periodButtonText, selectedPeriod === 'week' && styles.periodButtonTextActive]}>
              本周
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.periodButton, selectedPeriod === 'month' && styles.periodButtonActive]}
            onPress={() => setSelectedPeriod('month')}
          >
            <Text style={[styles.periodButtonText, selectedPeriod === 'month' && styles.periodButtonTextActive]}>
              本月
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>卡路里摘要</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{data.totalCalories}</Text>
              <Text style={styles.summaryLabel}>总卡路里</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{data.avgCalories}</Text>
              <Text style={styles.summaryLabel}>日均卡路里</Text>
            </View>
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>卡路里趋势</Text>
          {renderChart()}
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FF3B30' }]} />
              <Text style={styles.legendText}>超标</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#4CD964' }]} />
              <Text style={styles.legendText}>达标</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FFCC00' }]} />
              <Text style={styles.legendText}>不足</Text>
            </View>
          </View>
        </View>

        <View style={styles.nutritionCard}>
          <Text style={styles.cardTitle}>营养分布</Text>
          <View style={styles.nutritionBar}>
            <View 
              style={[
                styles.nutritionSegment, 
                { 
                  backgroundColor: '#FFD60A',
                  width: `${data.nutrition.carbs.percentage}%`
                }
              ]} 
            />
            <View 
              style={[
                styles.nutritionSegment, 
                { 
                  backgroundColor: '#FF375F',
                  width: `${data.nutrition.protein.percentage}%`
                }
              ]} 
            />
            <View 
              style={[
                styles.nutritionSegment, 
                { 
                  backgroundColor: '#5AC8FA',
                  width: `${data.nutrition.fats.percentage}%`
                }
              ]} 
            />
          </View>
          <View style={styles.nutritionStats}>
            <View style={styles.nutritionItem}>
              <View style={[styles.nutritionDot, { backgroundColor: '#FFD60A' }]} />
              <Text style={styles.nutritionLabel}>碳水化合物</Text>
              <Text style={styles.nutritionValue}>{data.nutrition.carbs.percentage}%</Text>
              <Text style={styles.nutritionSubtext}>
                日均 {data.nutrition.carbs.avg}克
              </Text>
            </View>
            <View style={styles.nutritionItem}>
              <View style={[styles.nutritionDot, { backgroundColor: '#FF375F' }]} />
              <Text style={styles.nutritionLabel}>蛋白质</Text>
              <Text style={styles.nutritionValue}>{data.nutrition.protein.percentage}%</Text>
              <Text style={styles.nutritionSubtext}>
                日均 {data.nutrition.protein.avg}克
              </Text>
            </View>
            <View style={styles.nutritionItem}>
              <View style={[styles.nutritionDot, { backgroundColor: '#5AC8FA' }]} />
              <Text style={styles.nutritionLabel}>脂肪</Text>
              <Text style={styles.nutritionValue}>{data.nutrition.fats.percentage}%</Text>
              <Text style={styles.nutritionSubtext}>
                日均 {data.nutrition.fats.avg}克
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.topFoodsCard}>
          <Text style={styles.cardTitle}>常见食物</Text>
          {data.topFoods.map((food, index) => (
            <View key={index} style={styles.foodItem}>
              <View style={styles.foodRank}>
                <Text style={styles.foodRankText}>{index + 1}</Text>
              </View>
              <View style={styles.foodInfo}>
                <Text style={styles.foodName}>{food.name}</Text>
                <Text style={styles.foodFrequency}>食用 {food.frequency} 次</Text>
              </View>
              <Text style={styles.foodCalories}>{food.calories} 卡路里</Text>
            </View>
          ))}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#000000',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  periodButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8E8E93',
  },
  periodButtonTextActive: {
    color: '#000000',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
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
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#007AFF',
    marginBottom: 4,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
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
    marginBottom: 15,
  },
  chartContainer: {
    height: 250,
    flexDirection: 'row',
  },
  chartBars: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  bar: {
    width: 8,
    borderRadius: 4,
  },
  barDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 8,
  },
  chartLines: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 20,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  chartLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  nutritionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nutritionBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
    marginBottom: 20,
  },
  nutritionSegment: {
    height: '100%',
  },
  nutritionStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    flex: 1,
    alignItems: 'center',
  },
  nutritionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 6,
  },
  nutritionLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  nutritionValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  nutritionSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  topFoodsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  foodRank: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  foodRankText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#8E8E93',
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  foodFrequency: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  foodCalories: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#007AFF',
  },
});