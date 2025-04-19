import { Pressable, Text, View, StyleSheet, Platform } from "react-native";

function CategoryGridTile({ title, color, id, onPress }) {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Pressable android_ripple={{ color: "#808080" }} style={styles.pressable}
      onPress={onPress}>
        <View style={styles.innerContainer}>
          <Text style={styles.txt}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CategoryGridTile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 150,
    margin: 16,
    borderRadius: 12,
    elevation: 5, // Android shadow
    shadowColor: "black", // iOS shadow
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: "white", // fallback background
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  pressable: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  txt: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
    textAlign: "center",
  },
});
