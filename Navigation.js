import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, LoginScreen, RegisterScreen } from "./src/screens/index";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShow: true,
          contentStyle: { backgroundColor: "white" },
        }}
        initialRouteName="home"
      >
        <Stack.Screen name="home" component={<HomeScreen />} />
        <Stack.Screen name="login" component={<LoginScreen/>} />
        <Stack.Screen name="register" component={<RegisterScreen />} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
