import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Camera, CreditCard as Edit2 } from 'lucide-react-native';

export default function MerchantInfoScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.cameraButton}>
            <Camera size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>商家名称</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>健康生活连锁店</Text>
            <Edit2 size={20} color="#666666" />
          </View>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>联系电话</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>13800138000</Text>
            <Edit2 size={20} color="#666666" />
          </View>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>电子邮箱</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>business@example.com</Text>
            <Edit2 size={20} color="#666666" />
          </View>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>营业执照</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>91310000XXXXXXXX</Text>
            <Edit2 size={20} color="#666666" />
          </View>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>经营范围</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>健身服务、营养咨询、零售</Text>
            <Edit2 size={20} color="#666666" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 32,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    paddingHorizontal: 16,
  },
  infoItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    color: '#000000',
  },
});