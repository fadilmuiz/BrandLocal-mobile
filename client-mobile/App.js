import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import client from "./config/client"
import DetailScreen from "./screens/DetailScreen";
import ScreenKanan from "./screens/ScreenKanan";
import Home from "./screens/Home"

import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dasboard" component={Home} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused
                  ? "home-outline"
                  : "home";
              } else if (route.name === "Favotites") {
                iconName = focused
                  ? "star-outline"
                  : "star";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "red",
            tabBarInactiveTintColor: "gray",
            // headerShown: false 
          })}
        >
          <Tab.Screen name="Home" component={HomeStack}></Tab.Screen>
          {/* <Tab.Screen name="DetailScreen" component={DetailScreen} ></Tab.Screen> */}
          <Tab.Screen name="Favotites" component={ScreenKanan} ></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
