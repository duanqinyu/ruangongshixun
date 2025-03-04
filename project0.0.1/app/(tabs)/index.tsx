import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, User</Text>
          <Text style={styles.title}>Track your calories</Text>
        </View>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#8E8E93" />
            <Text style={styles.searchText}>Search foods...</Text>
          </View>
        </View>
        
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Today's Summary</Text>
          <View style={styles.calorieInfo}>
            <View style={styles.calorieCount}>
              <Text style={styles.calorieNumber}>1,250</Text>
              <Text style={styles.calorieLabel}>consumed</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.calorieCount}>
              <Text style={styles.calorieNumber}>2,000</Text>
              <Text style={styles.calorieLabel}>goal</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.calorieCount}>
              <Text style={styles.calorieNumber}>750</Text>
              <Text style={styles.calorieLabel}>remaining</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.mealsSection}>
          <Text style={styles.sectionTitle}>Today's Meals</Text>
          
          <View style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealType}>Breakfast</Text>
              <Text style={styles.mealCalories}>615 cal</Text>
            </View>
            <View style={styles.mealItem}>
              <Text style={styles.mealName}>Pancakes with blueberries & syrup</Text>
              <View style={styles.nutritionInfo}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>Carbs</Text>
                  <Text style={styles.nutritionValue}>93g</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>Protein</Text>
                  <Text style={styles.nutritionValue}>11g</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionLabel}>Fats</Text>
                  <Text style={styles.nutritionValue}>21g</Text>
                </View>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={styles.addMealButton}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addMealText}>Add Meal</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Foods</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentScrollView}>
            {[
              { name: 'Pancakes', calories: 595, image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80' },
              { name: 'Blueberries', calories: 8, image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80' },
              { name: 'Syrup', calories: 12, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80' },
              { name: 'Coffee', calories: 5, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80' },
            ].map((item, index) => (
              <View key={index} style={styles.recentItem}>
                <Image source={{ uri: item.image }} style={styles.recentImage} />
                <Text style={styles.recentName}>{item.name}</Text>
                <Text style={styles.recentCalories}>{item.calories} cal</Text>
              </View>
            ))}
          </ScrollView>
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
    paddingBottom: 10,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#000000',
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#8E8E93',
    marginLeft: 10,
  },
  summaryCard: {
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
  summaryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 15,
  },
  calorieInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calorieCount: {
    flex: 1,
    alignItems: 'center',
  },
  calorieNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#007AFF',
  },
  calorieLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E5E5',
  },
  mealsSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 15,
  },
  mealCard: {
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
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  mealType: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000000',
  },
  mealCalories: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#007AFF',
  },
  mealItem: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 10,
  },
  mealName: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: '#000000',
    marginBottom: 8,
  },
  nutritionInfo: {
    flexDirection: 'row',
  },
  nutritionItem: {
    marginRight: 20,
  },
  nutritionLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#8E8E93',
  },
  nutritionValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#000000',
    marginTop: 2,
  },
  addMealButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  addMealText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  recentSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  recentScrollView: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  recentItem: {
    width: 120,
    marginRight: 15,
  },
  recentImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  recentName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#000000',
  },
  recentCalories: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#8E8E93',
  },
});