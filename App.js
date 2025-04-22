import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScree";
import mealDetaiScreen from "./screens/mealDetaiScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#351401" },
            headerTintColor: "white",
            contentStyle: { backgroundColor: "#3f2f25" },
          }}
          /*screenOptions={{
            headerStyle: { backgroundColor: "#351401" },
            headerTintColor: "white",
            contentStyle: { backgroundColor: "#3f2f25" },
          }}*/
        >
          <Stack.Screen
            name="Categories"
            component={CategoriesScreen}
            options={{ title: "All Categories" }}
          />
          <Stack.Screen
            name="MealsOverview"
            component={MealsOverviewScreen}
            // options={({route, navigation})=>{
            //  const catId = route.params.categoryId;
            //  const titled = route.params.title;
            //   return{title: titled}
            // }}
          />
          <Stack.Screen
            name="MealDetail"
            options={{ title: "Meal Details" }}
            component={mealDetaiScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    backgroundColor: "#351401",
    padding: 16,
    alignItems: "center",
  }
});
