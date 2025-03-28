import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Trophy, Star, Target, Zap, Flame, Heart, Apple, Salad, Calendar as CalendarIcon } from 'lucide-react-native';
import { router } from 'expo-router';

// Mock data for achievements
const achievements = {
  stats: {
    totalAchievements: 24,
    completedAchievements: 15,
    totalPoints: 1250,
    currentStreak: 7,
  },
  categories: [
    {
      name: '连续打卡',
      icon: CalendarIcon,
      color: '#FF9500',
      achievements: [
        {
          id: 1,
          name: '坚持不懈',
          description: '连续记录7天的餐食',
          progress: 100,
          points: 100,
          completed: true,
          date: '2025-03-10',
          image: 'https://images.unsplash.com/photo-1495214783159-3503f1c2440d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80'
        },
        {
          id: 2,
          name: '持之以恒',
          description: '连续记录30天的餐食',
          progress: 60,
          points: 300,
          completed: false,
          image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80'
        }
      ]
    },
    {
      name: '营养均衡',
      icon: Heart,
      color: '#FF2D55',
      achievements: [
        {
          id: 3,
          name: '营养专家',
          description: '连续7天达到推荐的蛋白质摄入量',
          progress: 100,
          points: 150,
          completed: true,
          date: '2025-03-12',
          image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80'
        },
        {
          id: 4,
          name: '均衡达人',
          description: '连续30天保持碳水化合物、蛋白质和脂肪的理想比例',
          progress: 40,
          points: 400,
          completed: false,
          image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80'
        }
      ]
    },
    {
      name: '卡路里控制',
      icon: Flame,
      color: '#FF3B30',
      achievements: [
        {
          id: 5,
          name: '目标达成',
          description: '连续7天达到每日卡路里目标',
          progress: 100,
          points: 200,
          completed: true,
          date: '2025-03-15',
          image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80'
        },
        {
          id: 6,
          name: '完美控制',
          description: '连续30天保持在目标卡路里范围内',
          progress: 75,
          points: 500,
          completed: false,
          image: 'https://images.unsplash.com/photo-1495214783159-3503f1c2440d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80'
        }
      ]
    },
    {
      name: '健康饮食',
      icon: Apple,
      color: '#4CD964',
      achievements: [
        {
          id: 7,
          name: '蔬果达人',
          description: '连续7天摄入足量的水果和蔬菜',
          progress: 100,
          points: 150,
          completed: true,
          date: '2025-03-18',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80'
        },
        {
          id: 8,
          name: '健康先锋',
          description: '累计记录100种不同的健康食物',
          progress: 85,
          points: 300,
          completed: false,
          image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80'
        }
      ]
    }
  ]
};

export default function AchievementsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.title}>我的成就</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Trophy size={24} color="#FFD700" />
            <Text style={styles.statsTitle}>成就概览</Text>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statsItem}>
              <Text style={styles.statsValue}>{achievements.stats.completedAchievements}</Text>
              <Text style={styles.statsLabel}>已完成</Text>
            </View>
            <View style={styles.statsDivider} />
            <View style={styles.statsItem}>
              <Text style={styles.statsValue}>{achievements.stats.totalPoints}</Text>
              <Text style={styles.statsLabel}>总积分</Text>
            </View>
            <View style={styles.statsDivider} />
            <View style={styles.statsItem}>
              <Text style={styles.statsValue}>{achievements.stats.currentStreak}</Text>
              <Text style={styles.statsLabel}>连续天数</Text>
            </View>
          </View>
        </View>

        {achievements.categories.map((category, index) => (
          <View key={index} style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                <category.icon size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.categoryTitle}>{category.name}</Text>
            </View>

            {category.achievements.map((achievement, achievementIndex) => (
              <View 
                key={achievementIndex} 
                style={[
                  styles.achievementCard,
                  achievement.completed && styles.achievementCardCompleted
                ]}
              >
                <Image 
                  source={{ uri: achievement.image }}
                  style={styles.achievementImage}
                />
                <View style={styles.achievementContent}>
                  <View style={styles.achievementHeader}>
                    <Text style={styles.achievementName}>{achievement.name}</Text>
                    <View style={styles.pointsContainer}>
                      <Star size={16} color="#FFD700" />
                      <Text style={styles.pointsText}>{achievement.points}</Text>
                    </View>
                  </View>
                  <Text style={styles.achievementDescription}>
                    {achievement.description}
                  </Text>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { width: `${achievement.progress}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>{achievement.progress}%</Text>
                  </View>
                  {achievement.completed && achievement.date && (
                    <Text style={styles.completionDate}>
                      完成于 {achievement.date}
                    </Text>
                  )}
                </View>
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
  statsCard: {
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
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginLeft: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsItem: {
    flex: 1,
    alignItems: 'center',
  },
  statsValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#007AFF',
    marginBottom: 4,
  },
  statsLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  statsDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E5E5',
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  categoryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementCardCompleted: {
    borderWidth: 1,
    borderColor: '#4CD964',
  },
  achievementImage: {
    width: 100,
    height: '100%',
  },
  achievementContent: {
    flex: 1,
    padding: 15,
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFB800',
    marginLeft: 4,
  },
  achievementDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  progressText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#8E8E93',
  },
  completionDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#4CD964',
    marginTop: 8,
  },
});