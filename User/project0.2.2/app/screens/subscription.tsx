import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Check } from 'lucide-react-native';
import { router } from 'expo-router';

const plans = [
  {
    name: '月度计划',
    price: '29',
    period: '月',
    features: [
      '无限食物扫描',
      '详细营养分析',
      '个性化饮食建议',
      '7×24小时客服支持',
      '导出数据报告'
    ],
    recommended: true
  },
  {
    name: '年度计划',
    price: '299',
    period: '年',
    features: [
      '包含月度计划所有功能',
      '额外20%优惠',
      'AI营养师指导',
      '专属健身计划',
      '优先体验新功能'
    ],
    recommended: false
  }
];

export default function SubscriptionScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.title}>升级会员</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.heroSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80' }}
            style={styles.heroImage}
          />
          <Text style={styles.heroTitle}>解锁全部高级功能</Text>
          <Text style={styles.heroSubtitle}>
            升级到高级会员，获取更多专业功能，开启您的健康生活
          </Text>
        </View>

        <View style={styles.plansContainer}>
          {plans.map((plan, index) => (
            <View 
              key={index}
              style={[
                styles.planCard,
                plan.recommended && styles.recommendedPlan
              ]}
            >
              {plan.recommended && (
                <View style={styles.recommendedBadge}>
                  <Text style={styles.recommendedText}>推荐</Text>
                </View>
              )}
              
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.currency}>¥</Text>
                <Text style={styles.price}>{plan.price}</Text>
                <Text style={styles.period}>/{plan.period}</Text>
              </View>

              <View style={styles.featuresContainer}>
                {plan.features.map((feature, featureIndex) => (
                  <View key={featureIndex} style={styles.featureItem}>
                    <Check size={20} color="#4CD964" />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity 
                style={[
                  styles.subscribeButton,
                  plan.recommended && styles.recommendedButton
                ]}
              >
                <Text style={[
                  styles.subscribeButtonText,
                  plan.recommended && styles.recommendedButtonText
                ]}>
                  选择此方案
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Text style={styles.guaranteeText}>
          30天无条件退款保证 · 随时取消订阅
        </Text>
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
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  heroImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 20,
  },
  heroTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
  },
  plansContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  planCard: {
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
  recommendedPlan: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recommendedText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  planName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  currency: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 4,
  },
  price: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: '#000000',
    marginHorizontal: 4,
  },
  period: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 6,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#000000',
    marginLeft: 12,
  },
  subscribeButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  recommendedButton: {
    backgroundColor: '#007AFF',
  },
  subscribeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
  },
  recommendedButtonText: {
    color: '#FFFFFF',
  },
  guaranteeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 30,
  },
});
