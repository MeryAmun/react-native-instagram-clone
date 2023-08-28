import {
  collection,
  query,
  onSnapshot,
  orderBy,
  getDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

import {
  USER_POSTS_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  USER_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE,
  CLEAR_DATA,
} from "../constants";

export const fetchUser = () => {
  return (dispatch) => {
    const colRef = collection(db, "users");
    getDoc(doc(colRef, auth.currentUser?.uid)).then((snapshot) => {
      dispatch({ type: USER_STATE_CHANGE, payload: snapshot.data() });
    });
  };
};

export const fetchUserPosts = () => {
  return async (dispatch) => {
    const data = query(
      collection(db, `posts/${auth.currentUser?.uid}/userPosts`),
      orderBy("timestamp", "desc")
    );

    onSnapshot(data, (querySnapshot) => {
      const posts = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      dispatch({ type: USER_POSTS_STATE_CHANGE, payload: posts });
    });
  };
};

export const fetchUserFollowing = () => {
  return async (dispatch) => {
    const data = query(
      collection(db, `following/${auth.currentUser?.uid}/userFollowing`)
    );

    onSnapshot(data, (querySnapshot) => {
      const following = querySnapshot.docs.map((doc) => {
        const data = doc.id;
        //console.log(data)
        return data;
      });

      dispatch({ type: USER_FOLLOWING_STATE_CHANGE, payload: following });

      for (let i = 0; i < following.length; i++) {
        dispatch(fetchAllUsersData(following[i]));
      }
    });
  };
};

export const fetchAllUsersData = (uid) => {
  return (dispatch, getState) => {
    const found = getState().usersState.users.some((el) => el.id === uid);
    if (!found) {
      const colRef = collection(db, "users");
      getDoc(doc(colRef, uid)).then((snapshot) => {
        if (snapshot.exists) {
          let user = snapshot.data();
          user.uid = snapshot.id;
          dispatch({ type: USERS_DATA_STATE_CHANGE, user });
          dispatch(fetchUsersFollowingPosts(user.id));
        } else {
          console.log("does not exist");
        }
      });
    }
  };
};

export const fetchUsersFollowingPosts = (uid) => {
  return async (dispatch, getState) => {
    const data = query(
      collection(db, `posts/${uid}/userPosts`),
      orderBy("timestamp", "desc")
    );

    onSnapshot(data, (querySnapshot) => {
      //const uid = snapshot.query.EP.path.segments[1];
      const uid = querySnapshot.docs[0].ref.path.split("/")[1];

      const user = getState().usersState.users.find((el) => el.uid === uid);
      const posts = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data, user };
      });
      dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid });
    });
  };
};

export const clearData = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_DATA });
  };
};
