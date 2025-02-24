import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Search from '../../components/Search'
import Header from '../../components/Header'


const home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
       {/* Header */}
      <Header title="Profile"/>
        {/* Content */}
        <View>
          <Text>Categories</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  }
})