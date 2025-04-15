import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TrendingUp, Users, RefreshCw, DollarSign } from 'lucide-react-native';

export default function AnalyticsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>数据分析</Text>
        
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
          <View style={styles.chart}>
            {/* Chart placeholder */}
            <Text style={styles.placeholderText}>图表区域</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>用户分析</Text>
          <View style={styles.chart}>
            {/* Chart placeholder */}
            <Text style={styles.placeholderText}>图表区域</Text>
          </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
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
  chart: {
    height: 200,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#8E8E93',
  },
});