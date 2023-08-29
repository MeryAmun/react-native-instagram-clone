import { Text, StyleSheet,Button, View } from "react-native";
import React, { Component } from "react";
import Navigation from "./Navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebaseConfig";
import MainScreen from "./src/screens/MainScreen";
import Create  from "./src/subScreens/Create";
import { Provider } from "react-redux";
import { store } from './src/redux/store'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Save from "./src/subScreens/Save"
import Comments from "./src/subScreens/Comments";
const Stack = createNativeStackNavigator();
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isLoggedIn: false,
    };
  }
  componentDidMount() {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        this.setState({
          isLoggedIn: true,
          isLoaded: true,
        });
      } else{
        this.setState({
          isLoggedIn: false,
          isLoaded: true,
        });
      }
    });
  }

  
  render() {
    const { isLoaded, isLoggedIn } = this.state;
    if (!isLoaded) {
      return (
        <View style={styles.root}>
          <Text>Loading...</Text>
        </View>
      );
    }
    if (!isLoggedIn) {
      return <Navigation />;
    }
    return (
      <Provider store={store}>
         <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "white" },
        }}
        initialRouteName="Main Screen"
      >
      <Stack.Screen name="Main Screen" component={MainScreen}/>
      <Stack.Screen name="Create" component={Create} 
      />
      <Stack.Screen name="Save" component={Save} 
      />
      <Stack.Screen name="Comments" component={Comments} 
      />
      </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    gap:3
}
});
