import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, LoginScreen, RegisterScreen,MainScreen } from "./src/screens/index";
import { Provider } from "react-redux";
import { store } from './src/redux/store'
const Navigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShow: false,
          contentStyle: { backgroundColor: "white" },
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main Screen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default Navigation;
