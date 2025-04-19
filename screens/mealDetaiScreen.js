import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { MEALS } from "../data/dummy-data";

const MealDetailScreen = ({ route }) => {
  const { mealId } = route.params;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  if (!selectedMeal) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>Meal not found!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen}>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />

      <Text style={styles.title}>{selectedMeal.title}</Text>

      <View style={styles.detailsRow}>
        <Text style={styles.detailItem}>⏱ {selectedMeal.duration}m</Text>
        <Text style={styles.detailItem}>⚙️ {selectedMeal.complexity}</Text>
        <Text style={styles.detailItem}>💸 {selectedMeal.affordability}</Text>
      </View>

      <Text style={styles.sectionTitle}>🧾 Ingredients</Text>
      {selectedMeal.ingredients.map((item, index) => (
        <Text key={index} style={styles.listItem}>
          • {item}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>📜 Steps</Text>
      {selectedMeal.steps.map((step, index) => (
        <Text key={index} style={styles.listItem}>
          {index + 1}. {step}
        </Text>
      ))}

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
      </View>
    </ScrollView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFound: {
    fontSize: 18,
    color: "#888",
  },
  image: {
    width: "100%",
    height: 250,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    margin: 10,
    textAlign: "center",
    color: "#351401",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
    backgroundColor: "#f3e5dc",
    padding: 10,
    borderRadius: 10,
  },
  detailItem: {
    fontSize: 14,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginHorizontal: 16,
    color: "#f66495",
  },
  listItem: {
    marginHorizontal: 20,
    marginVertical: 4,
    fontSize: 16,
    color: "#444",
  },
  dietInfo: {
    margin: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  dietTag: {
    backgroundColor: "#fcd9e4",
    color: "#351401",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    margin: 4,
    fontSize: 14,
  },
});
