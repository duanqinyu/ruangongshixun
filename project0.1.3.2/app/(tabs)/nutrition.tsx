import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';

export default function NutritionScreen() {
  // 模拟数据
  const chartData = {
    labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    datasets: [
      {
        data: [1800, 2100, 1950, 2200, 1850, 2300, 2000],
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    strokeWidth: 2,
    decimalPlaces: 0,
    style: {
      borderRadius: 16,
    },
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>营养摄入</Text>
          <Text style={styles.subtitle}>追踪你的每日营养摄入情况</Text>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>本周卡路里摄入</Text>
          <LineChart
            data={chartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.nutritionSummary}>
          <Text style={styles.sectionTitle}>今日营养摄入</Text>
          
          <View style={styles.nutritionGrid}>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>1,850</Text>
              <Text style={styles.nutritionLabel}>卡路里</Text>
              <View style={[styles.progressBar, { backgroundColor: '#007AFF20' }]}>
                <View style={[styles.progressFill, { width: '75%', backgroundColor: '#007AFF' }]} />
              </View>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>65g</Text>
              <Text style={styles.nutritionLabel}>蛋白质</Text>
              <View style={[styles.progressBar, { backgroundColor: '#FF950020' }]}>
                <View style={[styles.progressFill, { width: '85%', backgroundColor: '#FF9500' }]} />
              </View>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>180g</Text>
              <Text style={styles.nutritionLabel}>碳水化合物</Text>
              <View style={[styles.progressBar, { backgroundColor: '#5856D620' }]}>
                <View style={[styles.progressFill, { width: '60%', backgroundColor: '#5856D6' }]} />
              </View>
            </View>

            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>45g</Text>
              <Text style={styles.nutritionLabel}>脂肪</Text>
              <View style={[styles.progressBar, { backgroundColor: '#FF2D5520' }]}>
                <View style={[styles.progressFill, { width: '70%', backgroundColor: '#FF2D55' }]} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.recommendations}>
          <Text style={styles.sectionTitle}>营养建议</Text>
          
          <View style={styles.recommendationCard}>
            <Text style={styles.recommendationTitle}>增加蛋白质摄入</Text>
            <Text style={styles.recommendationText}>
              建议增加瘦肉、鱼类、蛋类等优质蛋白的摄入，有助于维持肌肉量和促进恢复。
            </Text>
          </View>

          <View style={styles.recommendationCard}>
            <Text style={styles.recommendationTitle}>控制碳水化合物</Text>
            <Text style={styles.recommendationText}>
              建议选择全谷物、蔬菜等低GI碳水化合物，避免精制糖和淀粉的过量摄入。
            </Text>
          </View>
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
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666666',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  nutritionSummary: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 16,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    width: '48%',
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
  nutritionValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 4,
  },
  nutritionLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  recommendations: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recommendationTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
  },
  recommendationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});
