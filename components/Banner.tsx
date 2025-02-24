import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Banner = () => {
  return (
    <View style={{
        marginTop:20
    }}>
      <Image source={require('../assets/favicon.png')} 
      style={{
        width:'100%',
        height:190,
        borderRadius:15
      }}/>
      <View>
        <Text></Text>
      </View>
    </View>
  )
}

export default Banner

const styles = StyleSheet.create({})