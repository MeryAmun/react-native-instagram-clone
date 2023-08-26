import { Text, StyleSheet, View, Button } from 'react-native'
import React, { Component } from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';

const Profile = () =>  {


  const logOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

    return (
      <View style={styles.root}>
        <Text>ProfileScreen</Text>
        <Button title='log out' onPress={logOut}/>
      </View>
    )
  }
  export default Profile 

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
})