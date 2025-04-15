import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Page Not Found</Text>
        <Text style={styles.text}>The screen you're looking for doesn't exist.</Text>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.button}>
            <ArrowLeft size={20} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Go to home screen</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 10,
    color: '#000000',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 30,
    color: '#8E8E93',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});