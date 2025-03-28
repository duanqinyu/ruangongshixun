import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, Trash2, Calendar as CalendarIcon } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';

// Mock data for meal plans
const initialMealPlans = {
  monday: [
    { id: 1, name: '早餐', calories: 450, foods: ['全麦面包', '牛奶', '鸡蛋'] },
    { id: 2, name: '午餐', calories: 650, foods: ['米饭', '清炒西兰花', '鸡胸肉'] },
    { id: 3, name: '晚餐', calories: 550, foods: ['三明治', '沙拉', '酸奶'] }
  ],
  tuesday: [
    { id: 1, name: '早餐', calories: 400, foods: ['燕麦', '香蕉', '酸奶'] },
    { id: 2, name: '午餐', calories: 600, foods: ['意大利面', '番茄酱', '牛肉'] },
    { id: 3, name: '晚餐', calories: 500, foods: ['鱼', '蔬菜', '米饭'] }
  ],
  wednesday: [
    { id: 1, name: '早餐', calories: 420, foods: ['玉米片', '牛奶', '蓝莓'] },
    { id: 2, name: '午餐', calories: 580, foods: ['三明治', '沙拉', '果汁'] },
    { id: 3, name: '晚餐', calories: 520, foods: ['鸡肉', '土豆', '西兰花'] }
  ],
  thursday: [
    { id: 1, name: '早餐', calories: 380, foods: ['吐司', '花生酱', '苹果'] },
    { id: 2, name: '午餐', calories: 620, foods: ['寿司', '味增汤', '海藻'] },
    { id: 3, name: '晚餐', calories: 540, foods: ['豆腐', '青菜', '米饭'] }
  ],
  friday: [
    { id: 1, name: '早餐', calories: 430, foods: ['煎饼', '蜂蜜', '草莓'] },
    { id: 2, name: '午餐', calories: 590, foods: ['汉堡', '薯条', '沙拉'] },
    { id: 3, name: '晚餐', calories: 510, foods: ['意大利面', '肉丸', '蔬菜'] }
  ],
  saturday: [
    { id: 1, name: '早餐', calories: 460, foods: ['炒蛋', '培根', '面包'] },
    { id: 2, name: '午餐', calories: 630, foods: ['披萨', '沙拉', '汤'] },
    { id: 3, name: '晚餐', calories: 530, foods: ['烤鸡', '土豆泥', '胡萝卜'] }
  ],
  sunday: [
    { id: 1, name: '早餐', calories: 440, foods: ['粥', '包子', '豆浆'] },
    { id: 2, name: '午餐', calories: 610, foods: ['面条', '炒菜', '水果'] },
    { id: 3, name: '晚餐', calories: 560, foods: ['火锅', '蔬菜', '豆腐'] }
  ]
};

const weekDays = [
  { id: 'monday', name: '周一' },
  { id: 'tuesday', name: '周二' },
  { id: 'wednesday', name: '周三' },
  { id: 'thursday', name: '周四' },
  { id: 'friday', name: '周五' },
  { id: 'saturday', name: '周六' },
  { id: 'sunday', name: '周日' }
];

export default function MealPlanScreen() {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [mealPlans, setMealPlans] = useState(initialMealPlans);
  const [editingMeal, setEditingMeal] = useState<null | {
    dayId: string;
    mealId: number;
  }>(null);
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: '',
    foods: ''
  });

  // Calculate weekly and monthly totals
  const weeklyTotal = Object.values(mealPlans).reduce((acc, dayMeals) => {
    return acc + dayMeals.reduce((mealAcc, meal) => mealAcc + meal.calories, 0);
  }, 0);

  const monthlyTotal = weeklyTotal * 4; // Approximate monthly total

  const handleAddMeal = () => {
    if (newMeal.name && newMeal.calories && newMeal.foods) {
      const newMealObj = {
        id: mealPlans[selectedDay].length + 1,
        name: newMeal.name,
        calories: parseInt(newMeal.calories),
        foods: newMeal.foods.split(',').map(food => food.trim())
      };

      setMealPlans(prev => ({
        ...prev,
        [selectedDay]: [...prev[selectedDay], newMealObj]
      }));

      setNewMeal({ name: '', calories: '', foods: '' });
      setShowAddMeal(false);
    }
  };

  const handleDeleteMeal = (dayId: string, mealId: number) => {
    setMealPlans(prev => ({
      ...prev,
      [dayId]: prev[dayId].filter(meal => meal.id !== mealId)
    }));
  };

  const getDayTotal = (dayId: string) => {
    return mealPlans[dayId].reduce((acc, meal) => acc + meal.calories, 0);
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
        <Text style={styles.title}>饮食计划</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <CalendarIcon size={24} color="#007AFF" />
            <View style={styles.summaryTexts}>
              <Text style={styles.summaryLabel}>本周总卡路里</Text>
              <Text style={styles.summaryValue}>{weeklyTotal}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <CalendarIcon size={24} color="#FF9500" />
            <View style={styles.summaryTexts}>
              <Text style={styles.summaryLabel}>本月总卡路里</Text>
              <Text style={styles.summaryValue}>{monthlyTotal}</Text>
            </View>
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.daysScroll}
        >
          {weekDays.map(day => (
            <TouchableOpacity
              key={day.id}
              style={[
                styles.dayButton,
                selectedDay === day.id && styles.selectedDayButton
              ]}
              onPress={() => setSelectedDay(day.id)}
            >
              <Text style={[
                styles.dayButtonText,
                selectedDay === day.id && styles.selectedDayButtonText
              ]}>
                {day.name}
              </Text>
              <Text style={[
                styles.dayCalories,
                selectedDay === day.id && styles.selectedDayCalories
              ]}>
                {getDayTotal(day.id)} 卡路里
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.mealsContainer}>
          {mealPlans[selectedDay].map(meal => (
            <View key={meal.id} style={styles.mealCard}>
              <View style={styles.mealHeader}>
                <View>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealCalories}>{meal.calories} 卡路里</Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteMeal(selectedDay, meal.id)}
                >
                  <Trash2 size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>
              <Text style={styles.foodsLabel}>食物清单：</Text>
              <View style={styles.foodsList}>
                {meal.foods.map((food, index) => (
                  <View key={index} style={styles.foodTag}>
                    <Text style={styles.foodText}>{food}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}

          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowAddMeal(true)}
          >
            <Plus size={24} color="#FFFFFF" />
            <Text style={styles.addButtonText}>添加餐食</Text>
          </TouchableOpacity>

          {showAddMeal && (
            <View style={styles.addMealForm}>
              <TextInput
                style={styles.input}
                placeholder="餐食名称（如：早餐、午餐、晚餐）"
                value={newMeal.name}
                onChangeText={text => setNewMeal(prev => ({ ...prev, name: text }))}
              />
              <TextInput
                style={styles.input}
                placeholder="卡路里"
                keyboardType="numeric"
                value={newMeal.calories}
                onChangeText={text => setNewMeal(prev => ({ ...prev, calories: text }))}
              />
              <TextInput
                style={styles.input}
                placeholder="食物（用逗号分隔）"
                value={newMeal.foods}
                onChangeText={text => setNewMeal(prev => ({ ...prev, foods: text }))}
              />
              <View style={styles.formButtons}>
                <TouchableOpacity 
                  style={[styles.formButton, styles.cancelButton]}
                  onPress={() => setShowAddMeal(false)}
                >
                  <Text style={styles.cancelButtonText}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.formButton, styles.saveButton]}
                  onPress={handleAddMeal}
                >
                  <Text style={styles.saveButtonText}>保存</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryTexts: {
    marginLeft: 12,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  summaryValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#000000',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 20,
  },
  daysScroll: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  dayButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedDayButton: {
    backgroundColor: '#007AFF',
  },
  dayButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  selectedDayButtonText: {
    color: '#FFFFFF',
  },
  dayCalories: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  selectedDayCalories: {
    color: '#FFFFFF',
  },
  mealsContainer: {
    padding: 20,
  },
  mealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
  mealName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 4,
  },
  mealCalories: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  deleteButton: {
    padding: 8,
  },
  foodsLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  foodsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  foodTag: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  foodText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#000000',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    borderRadius: 12,
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
  addMealForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    height: 48,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  formButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
    marginRight: 8,
  },
  cancelButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#8E8E93',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    marginLeft: 8,
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});