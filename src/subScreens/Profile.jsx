import { Text, StyleSheet, View, Button,Image, FlatList,useWindowDimensions } from 'react-native'
import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { connect } from 'react-redux';

const Profile = (props) =>  {
  const { width } = useWindowDimensions();
const {currentUser, posts} = props
  const logOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

    return (
      <View style={styles.root}>
        <View style={styles.containerInfo}>
        <Text>{currentUser?.name}</Text>
        <Text>{currentUser?.email}</Text>
        </View>
        <View style={styles.containerDetails}>
         <FlatList
         numColumns={3}
         horizontal={false}
         data={posts}
         renderItem={({item}) => (
          <View>
            <Image source={{uri: item?.imageUrl}}
          style={styles.image}
          />
           {/* <Text>{item?.title}</Text> */}
          </View>
         )}
         />
        </View>
        <Button title='log out' onPress={logOut}/>
      </View>
    )
  }


  const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts:store.userState.posts
  })
  export default connect(mapStateToProps, null)(Profile) 

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop:40
      },
      containerInfo:{
        margin:20
      },
      containerDetails:{
        flex:1,
        marginTop:20
      },
      imageContainer:{
      flex: 1/3
      },
      image:{
       flex:1,
        width:"60%",
        aspectRatio: 1 / 1
      }
})

