import { Text, StyleSheet, View,TextInput,FlatList,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { db } from '../firebaseConfig';
import { collection, onSnapshot, query, where} from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';


 const Search = ()  => {
const [users, setUsers] = useState([]);
const navigation = useNavigation()

const handleSearch = (searchTerm) => {
    const data = query(collection(db, "users"),where('name','>=', searchTerm))
    onSnapshot(data, (querySnapshot) => {
     setUsers(
      querySnapshot.docs.map((doc) => ({
     id:doc.id,
     user:doc.data()
      }))
     )
    })
}

    return (
      <View style={styles.root}>
        <TextInput
        placeholder='Search'
        onChangeText={(search) => handleSearch(search)}
        />
        <FlatList
        data={users}
        renderItem={({item}) => (
          <TouchableOpacity
          onPress={() => navigation.navigate("Profile",{uid:item?.id})}
          >
            <Text>{item?.user?.name}</Text>
          </TouchableOpacity>
        )}
        numColumns={1}
        horizontal={false}
        />
      </View>
    )
  }
  export default Search
const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop:100
      },
      textInput:{
marginTop:30
      }
})