import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import KananStackPertama from "../components/KananStackPertama";

const Stack = createNativeStackNavigator();

const ScreenKanan = () => {
  return (
    <>
      {/* <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="KananStack1"
          component={KananStackPertama}
        ></Stack.Screen>
      </Stack.Navigator> */}
    </>
  );
};

export default ScreenKanan;
