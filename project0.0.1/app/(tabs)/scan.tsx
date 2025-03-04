import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Image as ImageIcon, Utensils } from 'lucide-react-native';

export default function ScanScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scan Food</Text>
        <Text style={styles.subtitle}>Take a photo or upload an image to identify food and calculate calories</Text>
      </View>
      
      <View style={styles.cameraContainer}>
        <View style={styles.cameraPlaceholder}>
          <Camera size={60} color="#8E8E93" />
          <Text style={styles.cameraText}>Point camera at food</Text>
        </View>
      </View>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <View style={styles.optionIconContainer}>
            <Camera size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.optionText}>Take Photo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionButton}>
          <View style={styles.optionIconContainer}>
            <ImageIcon size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.optionText}>Upload Image</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionButton}>
          <View style={styles.optionIconContainer}>
            <Utensils size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.optionText}>Manual Entry</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.recentScansSection}>
        <Text style={styles.sectionTitle}>Recent Scans</Text>
        
        <View style={styles.recentScanItem}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80' }} 
            style={styles.recentScanImage} 
          />
          <View style={styles.recentScanInfo}>
            <Text style={styles.recentScanName}>Pancakes with blueberries & syrup</Text>
            <Text style={styles.recentScanTime}>Today, 9:41 AM</Text>
            <Text style={styles.recentScanCalories}>615 calories</Text>
          </View>
        </View>
        
        <View style={styles.recentScanItem}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80' }} 
            style={styles.recentScanImage} 
          />
          <View style={styles.recentScanInfo}>
            <Text style={styles.recentScanName}>Vegetable Salad</Text>
            <Text style={styles.recentScanTime}>Yesterday, 1:30 PM</Text>
            <Text style={styles.recentScanCalories}>320 calories</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
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
    lineHeight: 22,
  },
  cameraContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#E5E5E5',
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    fontFamily: 'Inter-Medium',
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
    alignItems: 'center',
  },
  optionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
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
    fontSize: 18,
    color: '#000000',
    marginBottom: 15,
  },
  recentScanItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recentScanImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  recentScanInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  recentScanName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  recentScanTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  recentScanCalories: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#007AFF',
  },
});