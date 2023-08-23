import { Text, StyleSheet, View ,Button} from 'react-native'
import React, { Component } from 'react'
import { signOut} from "firebase/auth";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser} from '../redux/actions/index'
import { auth } from '../firebaseConfig';

export  class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this)
      }
      onLogout(){
        signOut(auth)
          .then(() => {})
          .catch((error) => {});
      };
    componentDidMount(){
  this.props.fetchUser()
    }
  render() {
    const { currentUser } = this.props;
    
    return (
        <View style={styles.root}>
          <Text>{currentUser?.name} is Logged in</Text>
          <Button title='Log out' 
        onPress={() => this.onLogout()}/>
        </View>
      );
  }
}


const mapStateToProps = (store) => ({
currentUser:store.userState.currentUser
})
const mapDispatchToProps = (dispatch) => bindActionCreators({fetchUser},dispatch)
export default  connect(mapStateToProps,mapDispatchToProps)(MainScreen)
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
}
});