import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default class ProfileScreen extends Component {
  render() {
    return (
      <View style={styles.root}>
        <Text>ProfileScreen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
})