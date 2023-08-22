import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigate = useNavigation()
  return (
    <View style={styles.root}>
      <Text>LoginScreen</Text>
      <Button title='Register' onPress={() => navigate.navigate('Register')}/>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  root:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
}
})