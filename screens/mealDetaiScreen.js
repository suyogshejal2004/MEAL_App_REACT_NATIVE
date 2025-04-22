import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from "react-native";


import { Ionicons } from "@expo/vector-icons"; // For icons
import { MEALS } from "../data/dummy-data";
import { useState } from "react";

const MealDetailScreen = ({ route, navigation }) => {
  const { mealId } = route.params;
  const [isFavorite, setIsFavorite] = useState(false); // State for favorite toggle

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  if (!selectedMeal) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>Meal not found!</Text>
      </View>
    );
  }

  // Toggle favorite status
  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  // Share meal details (placeholder for sharing functionality)
  const shareMeal = () => {
    // Implement sharing logic (e.g., using Share API)
    console.log(`Sharing ${selectedMeal.title}`);
  };

  return ( 
    <ScrollView style={styles.screen}>
      {/* Header Image with Overlay */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: selectedMeal.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.imageTitle}>{selectedMeal.title}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={toggleFavorite}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "#ff4d4d" : "#fff"}
          />
          <Text style={styles.actionButtonText}>
            {isFavorite ? "Remove Favorite" : "Add to Favorites"}
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={shareMeal}
        >
          <Ionicons name="share-outline" size={24} color="#fff" />
          <Text style={styles.actionButtonText}>Share</Text>
        </Pressable>
      </View>

      {/* Meal Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailsRow}>
          <View style={styles.detailCard}>
            <Ionicons name="time-outline" size={20} color="#351401" />
            <Text style={styles.detailText}>{selectedMeal.duration} mins</Text>
          </View>
          <View style={styles.detailCard}>
            <Ionicons name="construct-outline" size={20} color="#351401" />
            <Text style={styles.detailText}>
              {selectedMeal.complexity.toUpperCase()}
            </Text>
          </View>
          <View style={styles.detailCard}>
            <Ionicons name="cash-outline" size={20} color="#351401" />
            <Text style={styles.detailText}>
              {selectedMeal.affordability.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Ingredients Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>🧾 Ingredients</Text>
          {selectedMeal.ingredients.map((item, index) => (
            <View key={index} style={styles.listItemContainer}>
              <Text style={styles.listItem}>• {item}</Text>
            </View>
          ))}
        </View>

        {/* Steps Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>📜 Steps</Text>
          {selectedMeal.steps.map((step, index) => (
            <View key={index} style={styles.listItemContainer}>
              <Text style={styles.listItem}>
                <Text style={styles.stepNumber}>{index + 1}. </Text>
                {step}
              </Text>
            </View>
          ))}
        </View>

        {/* Dietary Information */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>✅ Dietary Info</Text>
          <View style={styles.dietInfo}>
            {selectedMeal.isGlutenFree && (
              <Text style={styles.dietTag}>Gluten-Free</Text>
            )}
            {selectedMeal.isVegan && <Text style={styles.dietTag}>Vegan</Text>}
            {selectedMeal.isVegetarian && (
              <Text style={styles.dietTag}>Vegetarian</Text>
            )}
            {selectedMeal.isLactoseFree && (
              <Text style={styles.dietTag}>Lactose-Free</Text>
            )}
            {!selectedMeal.isGlutenFree &&
              !selectedMeal.isVegan &&
              !selectedMeal.isVegetarian &&
              !selectedMeal.isLactoseFree && (
                <Text style={styles.noDietText}>No specific dietary info</Text>
              )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  notFound: {
    fontSize: 18,
    color: "#888",
    fontWeight: "500",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 16,
    alignItems: "center",
  },
  imageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#351401",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f66495",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
  buttonPressed: {
    opacity: 0.8,
  },
  detailsContainer: {
    padding: 16,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  detailCard: {
    flex: 1,
    alignItems: "center",
    padding: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#351401",
    marginTop: 4,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
    marginHorizontal: 16,
    color: "#351401",
    borderBottomWidth: 2,
    borderBottomColor: "#f66495",
    paddingBottom: 4,
  },
  listItemContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 4,
    padding: 12,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  listItem: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  stepNumber: {
    fontWeight: "bold",
    color: "#f66495",
  },
  dietInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  dietTag: {
    backgroundColor: "#fcd9e4",
    color: "#351401",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 4,
    fontSize: 14,
    fontWeight: "500",
  },
  noDietText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
});
