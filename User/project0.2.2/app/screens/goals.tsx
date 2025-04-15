import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, Trash2, Target, Flame, Apple, Egg, Droplet } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';

// Mock data for goals
const initialGoals = [
  {
    id: 1,
    name: '每日卡路里',
    target: 2000,
    unit: '卡路里',
    icon: Flame,
    color: '#FF3B30',
    progress: 62.5,
    current: 1250
  },
  {
    id: 2,
    name: '碳水化合物',
    target: 250,
    unit: '克',
    icon: Apple,
    color: '#FFD60A',
    progress: 45,
    current: 112.5
  },
  {
    id: 3,
    name: '蛋白质',
    target: 120,
    unit: '克',
    icon: Egg,
    color: '#FF375F',
    progress: 55,
    current: 66
  },
  {
    id: 4,
    name: '脂肪',
    target: 70,
    unit: '克',
    icon: Droplet,
    color: '#5AC8FA',
    progress: 40,
    current: 28
  }
];

export default function GoalsScreen() {
  const [goals, setGoals] = useState(initialGoals);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    target: '',
    unit: ''
  });

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.target && newGoal.unit) {
      const goal = {
        id: goals.length + 1,
        name: newGoal.name,
        target: parseInt(newGoal.target),
        unit: newGoal.unit,
        icon: Target,
        color: '#007AFF',
        progress: 0,
        current: 0
      };

      setGoals(prev => [...prev, goal]);
      setNewGoal({ name: '', target: '', unit: '' });
      setShowAddGoal(false);
    } else {
      Alert.alert('错误', '请填写完整的目标信息');
    }
  };

  const handleDeleteGoal = (goalId: number) => {
    Alert.alert(
      '删除目标',
      '确定要删除这个目标吗？',
      [
        {
          text: '取消',
          style: 'cancel'
        },
        {
          text: '删除',
          style: 'destructive',
          onPress: () => {
            setGoals(prev => prev.filter(goal => goal.id !== goalId));
          }
        }
      ]
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
        <Text style={styles.title}>我的目标</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {goals.map(goal => (
          <View key={goal.id} style={styles.goalCard}>
            <View style={styles.goalHeader}>
              <View style={[styles.goalIcon, { backgroundColor: goal.color }]}>
                <goal.icon size={24} color="#FFFFFF" />
              </View>
              <View style={styles.goalInfo}>
                <Text style={styles.goalName}>{goal.name}</Text>
                <Text style={styles.goalTarget}>
                  目标: {goal.target} {goal.unit}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteGoal(goal.id)}
              >
                <Trash2 size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { 
                      width: `${goal.progress}%`,
                      backgroundColor: goal.color
                    }
                  ]} 
                />
              </View>
              <View style={styles.progressInfo}>
                <Text style={styles.progressText}>
                  当前: {goal.current} {goal.unit}
                </Text>
                <Text style={styles.progressPercentage}>
                  {goal.progress}%
                </Text>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddGoal(true)}
        >
          <Plus size={24} color="#FFFFFF" />
          <Text style={styles.addButtonText}>添加新目标</Text>
        </TouchableOpacity>

        {showAddGoal && (
          <View style={styles.addGoalForm}>
            <TextInput
              style={styles.input}
              placeholder="目标名称"
              value={newGoal.name}
              onChangeText={text => setNewGoal(prev => ({ ...prev, name: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder="目标数值"
              keyboardType="numeric"
              value={newGoal.target}
              onChangeText={text => setNewGoal(prev => ({ ...prev, target: text }))}
            />
            <TextInput
              style={styles.input}
              placeholder="单位（如：克、卡路里）"
              value={newGoal.unit}
              onChangeText={text => setNewGoal(prev => ({ ...prev, unit: text }))}
            />
            <View style={styles.formButtons}>
              <TouchableOpacity 
                style={[styles.formButton, styles.cancelButton]}
                onPress={() => setShowAddGoal(false)}
              >
                <Text style={styles.cancelButtonText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.formButton, styles.saveButton]}
                onPress={handleAddGoal}
              >
                <Text style={styles.saveButtonText}>保存</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    padding: 20,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  goalInfo: {
    flex: 1,
  },
  goalName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 4,
  },
  goalTarget: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  deleteButton: {
    padding: 8,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  progressPercentage: {
    fontFamily: 'Inter-Medium',
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
    marginBottom: 30,
  },
  addButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  addGoalForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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