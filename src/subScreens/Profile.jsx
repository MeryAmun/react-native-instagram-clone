import React, {useState, useEffect} from 'react'
import { Text, StyleSheet, View, Button,Image, FlatList,useWindowDimensions, } from 'react-native'
import { signOut } from "firebase/auth";
import { connect } from 'react-redux';
import { auth,db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import {collection, query, onSnapshot, orderBy , getDoc, doc,addDoc, deleteDoc, setDoc} from "firebase/firestore";


const Profile = (props) =>  {
  const { width } = useWindowDimensions();
const [userPosts, setUserPosts] = useState([])
const [user, setUser] = useState({});
const [following, setFollowing] = useState(false)
const navigation = useNavigation()
//console.log(props?.route?.params?.uid)
const {currentUser } = props;

useEffect(() => {
  const {currentUser, posts} = props;
  if(props?.route?.params?.uid === auth.currentUser.uid){
    setUser(currentUser)
    setUserPosts(posts)
  }else{
    const colRef = collection(db, "users")
    getDoc(doc(colRef,props?.route?.params?.uid))
    .then((snapshot) => {
      setUser(snapshot.data())
    });

    const data =  query(collection(db, `posts/${props?.route?.params?.uid}/userPosts`), orderBy("timestamp", "desc"))
 
    onSnapshot(data, (querySnapshot) => {
    const posts =  querySnapshot.docs.map((doc) => {
     const data = doc.data();
     const id = doc.id;
     return {id, ...data}
    })
    setUserPosts(posts)
     })

  }
  if(props.following.indexOf(props?.route?.params?.uid) > -1){
    setFollowing(true)
    }else{
      setFollowing(false)
    }
}, [props?.route?.params?.uid, props.following])


console.log(props.following)

const handleFollow = () => {
  // setDoc(doc(db, "collectionName", userID, "anotherCollectionName", documentID))
  setDoc(doc(db, 'following',auth.currentUser.uid,'userFollowing',props?.route?.params?.uid), 
  {});
 // setFollowing((prev) => !prev)
}
const handleUnFollow = () => {
  deleteDoc(doc(db, 'following',auth.currentUser.uid,'userFollowing',props?.route?.params?.uid), 
  {});
  //setFollowing((prev) => !prev)
}


  const logOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };


  if (user === null){
    return <View/>
  }
    return (
      <View style={styles.root}>
        <View style={styles.containerInfo}>
        <Text>{user?.name}</Text>
        <Text>{user?.email}</Text>
        {
          props?.route?.params?.uid !== auth.currentUser.uid ? 
          <View>
            {
              following ? ( <Button
              title='following'
              onPress={handleUnFollow}
              />
              
              )
              
              : ( <Button
                title='follow'
                onPress={handleFollow}
                />) 
            }
          </View>
          : null
        }
        </View>
        <View style={styles.containerDetails}>
         <FlatList
         numColumns={3}
         horizontal={false}
         data={userPosts}
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
  posts:store.userState.posts,
  following:store.userState.following
  })
  export default connect(mapStateToProps, null)(Profile) 

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
       
      },
      containerInfo:{
        marginTop:20
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

