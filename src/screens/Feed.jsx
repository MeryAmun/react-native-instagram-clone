import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default class Feed extends Component {
  render() {
    return (
      <View style={styles.root}>
        <Text>Feed</Text>
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