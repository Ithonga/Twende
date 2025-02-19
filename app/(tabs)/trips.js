import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import Header from '../../components/Header'

const trips = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header title='Trips' />
      </View>
    </SafeAreaView>
  )
}

export default trips

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "green",
    paddingHorizontal: 10
  },
})