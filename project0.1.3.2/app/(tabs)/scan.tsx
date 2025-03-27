import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Image as ImageIcon, Utensils } from 'lucide-react-native';

export default function ScanScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>扫描食物</Text>
          <Text style={styles.subtitle}>拍照或上传图片以识别食物并计算卡路里</Text>
        </View>
        
        <View style={styles.cameraContainer}>
          <View style={styles.cameraPlaceholder}>
            <Camera size={60} color="#8E8E93" />
            <Text style={styles.cameraText}>将相机对准食物</Text>
          </View>
        </View>
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.optionIconContainer}>
              <Camera size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.optionText}>拍照</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.optionIconContainer}>
              <ImageIcon size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.optionText}>上传图片</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.optionIconContainer}>
              <Utensils size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.optionText}>手动输入</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.recentScansSection}>
          <Text style={styles.sectionTitle}>最近扫描</Text>
          
          <View style={styles.recentScanItem}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80' }} 
              style={styles.recentScanImage} 
            />
            <View style={styles.recentScanInfo}>
              <Text style={styles.recentScanTitle}>早餐麦片</Text>
              <Text style={styles.recentScanCalories}>320 卡路里</Text>
              <Text style={styles.recentScanTime}>今天 08:30</Text>
            </View>
          </View>
          
          <View style={styles.recentScanItem}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80' }} 
              style={styles.recentScanImage} 
            />
            <View style={styles.recentScanInfo}>
              <Text style={styles.recentScanTitle}>蔬菜沙拉</Text>
              <Text style={styles.recentScanCalories}>180 卡路里</Text>
              <Text style={styles.recentScanTime}>昨天 12:45</Text>
            </View>
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
  cameraContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    height: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  cameraText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  optionButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  optionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#000000',
  },
  recentScansSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#000000',
    marginBottom: 16,
  },
  recentScanItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recentScanImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  recentScanInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  recentScanTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  recentScanCalories: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  recentScanTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
});
