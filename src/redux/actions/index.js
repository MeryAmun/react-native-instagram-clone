import {collection, query, onSnapshot, orderBy , getDoc, doc } from "firebase/firestore";
import {  auth, db } from "../../firebaseConfig";

import { USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE } from "../constants";

export const fetchUser = () => {
  return (dispatch) => {
    const colRef = collection(db, "users")
    getDoc(doc(colRef,auth.currentUser?.uid))
    .then((snapshot) => {
      dispatch({ type: USER_STATE_CHANGE, payload: snapshot.data()})
    })
  };
};
export const fetchUserPosts = () => {
  return (dispatch) => {
    const colRef = collection(db, `posts/userPosts${auth.currentUser?.uid}`)
   query(colRef, orderBy("timestamp, desc"))
   onSnapshot(data, (querySnapshot) => {
      querySnapshot.docs.map((doc) => (
        dispatch({ type: USER_POSTS_STATE_CHANGE, payload: doc.data()})
      ))
    })
  
     // dispatch({ type: USER_POSTS_STATE_CHANGE, payload: snapshot.data()})
  };
};
