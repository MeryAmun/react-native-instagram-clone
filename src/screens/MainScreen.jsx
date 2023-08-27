import {  StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { signOut} from "firebase/auth";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser,fetchUserPosts,fetchUserFollowing } from '../redux/actions/index'
import { auth } from '../firebaseConfig';
import { createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feed  from '../subScreens/Feed';
import Profile from '../subScreens/Profile';
import Search from '../subScreens/Search';

const Tab = createMaterialBottomTabNavigator();
const EmptyComponent = () => {
    return  (null)
}
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
  this.props.fetchUserPosts()
 this.props.fetchUserFollowing()

    }
    
  render() {
    // const { currentUser } = this.props || {}
    // console.log(currentUser)
    const currUid = this.props.currentUser?.id;
    return (
        <Tab.Navigator 
        initialRouteName='Feed'
         labeled={false}
         screenOptions={{
            headerShown: true,
          }}
         >
      <Tab.Screen name="Feed" component={Feed}  
       options={{
        tabBarLabel: 'Feed',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
      />
      <Tab.Screen name="Search" component={Search}  
       options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="magnify" color={color} size={26} />
        ),
      }}
      />
     {
  currUid === auth?.currentUser?.uid && ( 
    <Tab.Screen name="Profile" component={Profile}  
       options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-circle" color={color} size={26} />
        ),
      }}
      />
 )
     }
      
      <Tab.Screen name="Main Create" component={EmptyComponent}
      listeners={({navigation}) => ({
        tabPress: event => {
            event.preventDefault();
            navigation.navigate("Create")
        }
      })}  
       options={{
        tabBarLabel: 'Create',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="camera-plus" color={color} size={26} />
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
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts,fetchUserFollowing},dispatch)
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