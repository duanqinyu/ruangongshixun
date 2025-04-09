import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, ChevronDown } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

// Mock data for meal history
const mealHistory = [
  {
    date: '2025-03-15',
    totalCalories: 2200,
    meals: [
      {
        type: '早餐',
        time: '08:30',
        calories: 450,
        items: [
          {
            name: '全麦面包',
            calories: 150,
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80'
          },
          {
            name: '煎蛋',
            calories: 150,
            image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80'
          },
          {
            name: '牛奶',
            calories: 150,
            image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80'
          }
        ]
      },
      {
        type: '午餐',
        time: '12:30',
        calories: 850,
        items: [
          {
            name: '米饭',
            calories: 200,
            image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80'
          },
          {
            name: '清炒西兰花',
            calories: 150,
            image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80'
          },
          {
            name: '红烧肉',
            calories: 500,
            image: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80'
          }
        ]
      },
      {
        type: '晚餐',
        time: '18:30',
        calories: 900,
        items: [
          {
            name: '意大利面',
            calories: 400,
            image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80'
          },
          {
            name: '沙拉',
            calories: 200,
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80'
          },
          {
            name: '水果',
            calories: 300,
            image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80'
          }
        ]
      }
    ]
  }
];

export default function MealHistoryScreen() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.title}>餐食历史</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity 
          style={styles.monthSelector}
          onPress={() => setShowMonthPicker(!showMonthPicker)}
        >
          <Calendar size={20} color="#007AFF" />
          <Text style={styles.monthText}>
            {format(selectedMonth, 'yyyy年 MM月', { locale: zhCN })}
          </Text>
          <ChevronDown size={20} color="#8E8E93" />
        </TouchableOpacity>

        {mealHistory.map((day, dayIndex) => (
          <View key={dayIndex} style={styles.dayContainer}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayDate}>
                {format(new Date(day.date), 'MM月dd日 EEEE', { locale: zhCN })}
              </Text>
              <Text style={styles.dayCalories}>
                总计: {day.totalCalories} 卡路里
              </Text>
            </View>

            {day.meals.map((meal, mealIndex) => (
              <View key={mealIndex} style={styles.mealCard}>
                <View style={styles.mealHeader}>
                  <View style={styles.mealTypeContainer}>
                    <Text style={styles.mealType}>{meal.type}</Text>
                    <Text style={styles.mealTime}>{meal.time}</Text>
                  </View>
                  <Text style={styles.mealCalories}>{meal.calories} 卡路里</Text>
                </View>

                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.foodItemsContainer}
                >
                  {meal.items.map((item, itemIndex) => (
                    <View key={itemIndex} style={styles.foodItem}>
                      <Image source={{ uri: item.image }} style={styles.foodImage} />
                      <Text style={styles.foodName}>{item.name}</Text>
                      <Text style={styles.foodCalories}>{item.calories} 卡路里</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            ))}
          </View>
        ))}
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
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  monthText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
    marginHorizontal: 8,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dayDate: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
  },
  dayCalories: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8E8E93',
  },
  mealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealType: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
    marginRight: 8,
  },
  mealTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  mealCalories: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8E8E93',
  },
  foodItemsContainer: {
    marginTop: 8,
  },
  foodItem: {
    marginRight: 16,
    alignItems: 'center',
    width: 100,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  foodName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#000000',
    marginBottom: 4,
    textAlign: 'center',
  },
  foodCalories: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
});
