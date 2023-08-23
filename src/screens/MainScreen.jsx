import { Text, StyleSheet, View ,Button} from 'react-native'
import React, { Component } from 'react'
import { signOut} from "firebase/auth";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser} from '../redux/actions/index'
import { auth } from '../firebaseConfig';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {Feed ,ProfileScreen,Create}from './index';
const Tab = createBottomTabNavigator();

export  class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this)
      }
      onLogout(){
        signOut(auth)
          .then(() => {})
          .catch((error) => {});
      };
    componentDidMount(){
  this.props.fetchUser()
    }
  render() {
    const { currentUser } = this.props;
    
    return (
        <Tab.Navigator 
         screenOptions={{headerShown: false}}
         >
      <Tab.Screen name="Feed" component={Feed}  
       options={{
        tabBarLabel: 'Feed',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen}  
       options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-circle" color={color} size={26} />
        ),
      }}
      />
      <Tab.Screen name="Create" component={Create}  
       options={{
        tabBarLabel: 'Create',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="plus" color={color} size={26} />
        ),
      }}
      />
    </Tab.Navigator>
      );
  }
}


const mapStateToProps = (store) => ({
currentUser:store.userState.currentUser
})
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser},dispatch)
export default  connect(mapStateToProps,mapDispatchToProps)(MainScreen)
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