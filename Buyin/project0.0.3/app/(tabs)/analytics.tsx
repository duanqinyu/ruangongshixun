import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { TrendingUp, Users, RefreshCw, DollarSign } from 'lucide-react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function AnalyticsScreen() {
  const revenueData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    datasets: [
      {
        data: [20000, 45000, 28000, 80000, 99000, 125800],
      },
    ],
  };

  const userAnalyticsData = [
    {
      name: '新用户',
      population: 45,
      color: '#FF9800',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '回头客',
      population: 35,
      color: '#4CAF50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: '流失用户',
      population: 20,
      color: '#F44336',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.statsGrid}>
          <View style={styles.statsCard}>
            <DollarSign size={24} color="#007AFF" />
            <Text style={styles.statsValue}>¥12,580</Text>
            <Text style={styles.statsLabel}>今日收入</Text>
          </View>
          
          <View style={styles.statsCard}>
            <Users size={24} color="#4CAF50" />
            <Text style={styles.statsValue}>256</Text>
            <Text style={styles.statsLabel}>活跃用户</Text>
          </View>
          
          <View style={styles.statsCard}>
            <RefreshCw size={24} color="#FF9800" />
            <Text style={styles.statsValue}>68%</Text>
            <Text style={styles.statsLabel}>回头率</Text>
          </View>
          
          <View style={styles.statsCard}>
            <TrendingUp size={24} color="#FF3B30" />
            <Text style={styles.statsValue}>+15%</Text>
            <Text style={styles.statsLabel}>环比增长</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>收入趋势</Text>
          <LineChart
            data={revenueData}
            width={screenWidth - 64}
            height={220}
            chartConfig={{
              backgroundColor: '#FFFFFF',
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>用户分析</Text>
          <PieChart
            data={userAnalyticsData}
            width={screenWidth - 64}
            height={220}
            chartConfig={{
              backgroundColor: '#FFFFFF',
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statsCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  statsLabel: {
    fontSize: 14,
    color: '#666666',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});