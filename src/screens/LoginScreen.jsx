import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react'
import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from '../firebaseConfig';


export default class LoginScreen extends Component {
  constructor(props) {
 super(props)
 this.state = {
    email:"",
  password:"",
  },
  //console.log("prop",props)
  //verificationMessage:"",
  //errorMessage:""
 
    this.onLogin = this.onLogin.bind(this)
  }
  onLogin(){
    const {email, password } = this.state;

    signInWithEmailAndPassword(auth,email, password)
    .then((result) => {
     
      })
  //     .then(() => (
  //       this.setState({
  //        user:this.state.user = {
  //         username:"",
  //         email: "",
  //         password: "",
  //        }
         
  //       })
       
  //     ))
      .catch((error) => {
        const errorMessage = error.message;
        // this.setState({
        //   errorMessage:this.state.errorMessage = errorMessage
        // })
        console.log(errorMessage)
      });
      this.props.navigation.navigate("Main Screen")
  }
 
  render() {
    return (
      <View style={styles.root}>
     <TextInput
     placeholder='Email'
     onChangeText={(email) => this.setState({email})}
     />
     <TextInput
     placeholder='Password'
     secureTextEntry={true}
     onChangeText={(password) => this.setState({password})}
     />
      <Button title='Login' 
      onPress={() => this.onLogin()}/>
    </View>
    )
  }
}

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





