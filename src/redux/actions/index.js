import { collection, query, onSnapshot } from "firebase/firestore";
import {  db } from "../../firebaseConfig";

import { USER_STATE_CHANGE } from "../constants";

export const fetchUser = () => {
  return (dispatch) => {
    const data = query(collection(db, "users"));
   onSnapshot(data, (querySnapshot) => {
      querySnapshot.docs.map((doc) => {
      dispatch({ type: USER_STATE_CHANGE, payload: doc.data()})
      });
    });
  };
};
