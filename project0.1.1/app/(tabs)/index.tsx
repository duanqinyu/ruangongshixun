import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Users, UserCheck, Activity } from 'lucide-react-native';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  // Check if user is admin
  const isAdmin = localStorage.getItem('userType') === 'admin';

  // If not admin, return the original home screen
  if (!isAdmin) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Original home screen content */}
      </SafeAreaView>
    );
  }

  // Mock data for charts
  const mealMetricsData = {
    labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    datasets: [
      {
        data: [2100, 1950, 2300, 2000, 2400, 1800, 2200],
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  const registrationData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };

  const userActivityData = [
    {
      name: '活跃用户',
      population: 75,
      color: '#4CD964',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    },
    {
      name: '非活跃用户',
      population: 25,
      color: '#FF3B30',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12
    }
  ];

  const chartConfig = {
    backgroundColor: '#FFFFFF',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    style: {
      borderRadius: 16
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>管理员仪表盘</Text>
          <Text style={styles.subtitle}>数据分析与用户洞察</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: '#007AFF20' }]}>
              <Users size={24} color="#007AFF" />
            </View>
            <Text style={styles.statValue}>2,547</Text>
            <Text style={styles.statLabel}>总用户数</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: '#34C75920' }]}>
              <UserCheck size={24} color="#34C759" />
            </View>
            <Text style={styles.statValue}>1,890</Text>
            <Text style={styles.statLabel}>活跃用户</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: '#FF950020' }]}>
              <Activity size={24} color="#FF9500" />
            </View>
            <Text style={styles.statValue}>75%</Text>
            <Text style={styles.statLabel}>活跃率</Text>
          </View>
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>用户餐食指标分析</Text>
          <Text style={styles.chartSubtitle}>过去7天平均卡路里摄入量</Text>
          <LineChart
            data={mealMetricsData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>用户注册量分析</Text>
          <Text style={styles.chartSubtitle}>近6个月新增用户数量</Text>
          <BarChart
            data={registrationData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            style={styles.chart}
            showValuesOnTopOfBars
          />
        </View>

        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>用户活跃度分析</Text>
          <Text style={styles.chartSubtitle}>活跃与非活跃用户比例</Text>
          <PieChart
            data={userActivityData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
          />
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
    color: '#8E8E93',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  chartCard: {
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
  chartTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 8,
  },
  chartSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});