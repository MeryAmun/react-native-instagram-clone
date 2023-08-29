import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";


const Feed = (props) => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();


  useEffect(() => {
    const { usersFollowingLoaded,following, users} = props;
let posts = [];
//console.log(users,following,usersFollowingLoaded)
if(usersFollowingLoaded === following.length){
  for(let i = 0; i < following.length; i++){
  const user = users.find(el => el.uid === following[i]);
  if(user != undefined){
   // console.log('user',user)
    posts = [...posts, ...user.posts]
  }

  }
 // console.log(posts)
  posts.sort((x,y) => {
    return x.timestamp -y.timestamp;
  })
  setPosts(posts)
}

  }, [props.usersFollowingLoaded]);


  return (
    <View style={styles.root}>
      <View style={styles.containerDetails}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
           <Text style={styles.text}>{item?.user.name}</Text>
              <Image source={{ uri: item?.imageUrl }} style={styles.image} />
              <Text
              onPress={() => navigation.navigate("Comments",{postId: item.id, uid:item.user.uid})}
              >
                view comments
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  users: store.usersState.users,
  usersFollowingLoaded: store.usersState.usersFollowingLoaded,
});
export default connect(mapStateToProps, null)(Feed);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin:20
  },
  text: {
    flex:1
  },
  containerDetails: {
    flex: 1,
  },
  imageContainer: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
   
    aspectRatio: 1 / 1,
  },
});
