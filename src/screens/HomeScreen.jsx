import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
    const navigate = useNavigation()
  return (
    <View style={styles.root}>
      <Text>HomeScreen</Text>
      <View style={styles.buttonContainer}>
      <Button title='Login' onPress={() => navigate.navigate('Login')}/>
      <Button title='Register' onPress={() => navigate.navigate('Register')}/>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    root:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    buttonContainer:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:3
    }
})