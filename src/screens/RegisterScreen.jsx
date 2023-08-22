import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react'
import { createUserWithEmailAndPassword, sendEmailVerification,updateProfile } from "firebase/auth";
import { auth } from '../firebaseConfig';


export default class RegisterScreen extends Component {
  constructor(props) {
 super(props)
 this.state = {
    email:"",
  password:"",
  name:""
  },
  //verificationMessage:"",
  //errorMessage:""
 
    this.onSignUp = this.onSignUp.bind(this)
  }
  onSignUp(){
    const {name, email, password } = this.state;
  
  createUserWithEmailAndPassword(auth,email, password)
    .then((result) => {
      // send verification mail.
      // sendEmailVerification(auth.currentUser).then(() => {
      //   auth.useDeviceLanguage()
        console.log(result)
      })
    // auth.signOut();
    // this.setState({
    //   verificationMessage:this.state.verificationMessage = "Verification Email sent"
    // })
 // })
  //.then(() => {
  //       updateProfile(auth.currentUser, {
  //         displayName: name,
          
  //       });
  //      // navigate('/verify-email')
  //     })
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
  }
  render() {
   
    return (
      <View style={styles.root}>
     <TextInput
     placeholder='Name'
     onChangeText={(name) => this.setState({name})}
     />
     <TextInput
     placeholder='Email'
     onChangeText={(email) => this.setState({email})}
     />
     <TextInput
     placeholder='Password'
     secureTextEntry={true}
     onChangeText={(password) => this.setState({password})}
     />
      <Button title='Sign Up' 
      onPress={() => this.onSignUp()}/>
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





