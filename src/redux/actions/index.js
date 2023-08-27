import {collection, query, onSnapshot, orderBy , getDoc, doc} from "firebase/firestore";
import {  auth, db } from "../../firebaseConfig";

import { USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE,USER_FOLLOWING_STATE_CHANGE } from "../constants";

export const fetchUser = () => {
  return (dispatch) => {
    const colRef = collection(db, "users")
    getDoc(doc(colRef,auth.currentUser?.uid))
    .then((snapshot) => {
      dispatch({ type: USER_STATE_CHANGE, payload: snapshot.data()})
    })
  };
};

export const fetchUserPosts =  () => {
  return async (dispatch) => {
    const data =  query(collection(db, `posts/${auth.currentUser?.uid}/userPosts`), orderBy("timestamp", "desc"))
 
   onSnapshot(data, (querySnapshot) => {
   const posts =  querySnapshot.docs.map((doc) => {
    const data = doc.data();
    const id = doc.id;
    return {id, ...data}
   })
   dispatch({ type: USER_POSTS_STATE_CHANGE, payload: posts})
    })
  
     
  };
};

export const fetchUserFollowing =  () => {
  return async (dispatch) => {
    const data =  query(collection(db, `following/${auth.currentUser?.uid}/userFollowing`))
 
   onSnapshot(data, (querySnapshot) => {
   const following =  querySnapshot.docs.map((doc) => {
    const data = doc.id;
    console.log(data)
    return data
   })
   dispatch({ type: USER_FOLLOWING_STATE_CHANGE, payload: following})
    })
  
     
  };
};
