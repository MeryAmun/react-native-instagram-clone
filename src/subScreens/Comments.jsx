import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Button,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAllUsersData } from "../redux/actions";

const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [comment, setComment] = useState("");
  const propsUid = props.route.params.uid;
  const propsPostId = props.route.params.postId;

  useEffect(() => {
    const matchUserToComment = (comments) => {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].hasOwnProperty("user")) {
          continue;
        }
        const user = props.users.find((x) => x.uid === comments[i].creator);

        if (user == undefined) {
          props.fetchAllUsersData(comments[i].creator, false);
        } else {
          comments[i].user = user;
        }
      }

      setComments(comments);
    };

    if (propsPostId != postId) {
      const data = query(
        collection(db, `posts/${propsUid}/userPosts/${propsPostId}/comments`),
        orderBy("timestamp", "desc")
      );
      onSnapshot(data, (querySnapshot) => {
        let comments = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        matchUserToComment(comments);
      });
      setPostId(propsPostId);
    } else {
      matchUserToComment(comments);
    }
  }, [props.route.params.postId, props.users]);

  console.log(comments);
  //console.log(props.users);

  const handleComment = () => {
    addDoc(
      collection(db, `posts/${propsUid}/userPosts/${propsPostId}/comments`),
      {
        timestamp: serverTimestamp(),
        text: comment,
        creator: auth.currentUser.uid,
      }
    );
  };

  return (
    <View style={styles.root}>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={comments}
        renderItem={({ item }) => (
          <View>
            {item.user !== undefined ? <Text>{item.user.name}</Text> : null}
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <View>
        <TextInput
          placeholder="write comment..."
          onChangeText={(comment) => setComment(comment)}
        />
        <Button title="post comment" onPress={handleComment} />
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
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchAllUsersData }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Comments);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
