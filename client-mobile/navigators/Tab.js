import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Home from "../screens/Home";
// import Settings from "../screens/Settings";
// import Detail from "../screens/Detail";
import { Ionicons } from "@expo/vector-icons";
import MainStack from "./MainStack";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Dashboard") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "ios-settings" : "ios-settings-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={"teal"} />;
          },
          // tabBarLabelStyle: { color: "teal" },
          tabBarActiveTintColor: "teal",
          tabBarInactiveTintColor: "gray",
        };
      }}
    >
      <Tab.Screen
        name="Dashboard"
        // component={Home}
        component={MainStack} // nested navigator
      />
      {/* <Tab.Screen name="Detail" component={Detail} /> */}
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}