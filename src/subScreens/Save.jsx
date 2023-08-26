import { Button, Image, StyleSheet, Text,TextInput, View } from 'react-native'
import React, {useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable,} from "firebase/storage";
import { ProgressBar, Colors } from 'react-native-paper';
import {auth, db, storage } from '../firebaseConfig';
import { serverTimestamp,collection, setDoc, doc, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Save = (props) => {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
const navigation = useNavigation()
 console.log(progress)
  
  

    const handleImageUpload  = async () => {
      const uri = props.route.params.image.replace("file:///","file:/");
    const childPath =`/posts/${auth.currentUser.uid}/${Math.random().toString(36)}`;
    const storageRef = ref(storage, childPath)
    const blobFile = await uriToBlob(uri)

    const uploadTask =  uploadBytesResumable(storageRef, blobFile)
    
    uploadTask.on(
      "state_changed",
      async (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(percent);
        
      },
      (err) => {
        console.log(err)
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref)
        .then((url) => {
         
                addDoc(collection(db, `posts/${auth.currentUser.uid}/userPosts`), {
                    timestamp: serverTimestamp(),
                    title: caption,
                    imageUrl: url,
                  });
                  setProgress(0);
                }).then(() => {
                  navigation.popToTop()
                })
      })
    
  

  }
  return (
    <View style={styles.root}>
       <ProgressBar style={styles.progress}
       progress={progress} color="#49B5F2" />
      <Text>Save</Text>
      <Image source={{uri: props.route.params?.image}}/>
      <TextInput
      placeholder='Write Cation'
onChangeText={(caption) => setCaption(caption)}
      />
      <Button title='save' onPress={handleImageUpload}/>
    </View>
  )
}

export default Save

const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
     const xhr = new XMLHttpRequest()
     xhr.onload = function () {
       // return the blob
       console.log( resolve(xhr.response))
       resolve(xhr.response)
     }
     xhr.onerror = function () {
       reject(new Error('uriToBlob failed'))
     }
     xhr.responseType = 'blob'
     xhr.open('GET', uri, true)
 
     xhr.send(null)})}
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
},
progress:{
  marginTop: 100,
  marginBottom:10
}
});