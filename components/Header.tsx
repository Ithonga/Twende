import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
// import { useUser } from '@clerk/clerk-expo'

// const Header = () => {

//     const { user } = useUser()

const Header = ({ title }: { title: string }) => {
  // const { user } = useUser()

  return (
    <View style={{ paddingHorizontal: 15 }}>
      <View style={{
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Text style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "black"
        }}
        >{title}</Text>
        <View style={{ alignItems: 'flex-end', }}>
          {/*display user's image*/}
          {/* <Image source={{ uri: user?.imageUrl }} style={{ width: 50, height: 50, borderRadius: 50 }} /> */}
          {/* <View style={{ justifyContent: "flex-end", alignItems: 'flex-end' }}>
                  {/* Display user's name 
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {user?.fullName || "User"}
                  </Text>
                  <Text>{user?.emailAddresses[0].emailAddress}</Text>
                </View> */}
                <Image source={require('../assets/user.jpg')} style={{ width: 50, height: 50, borderRadius: 50 }} />
        </View>
      </View>
      <View>
        {/* <Search/> */}
      </View>


    </View>
  )
}


export default Header

const styles = StyleSheet.create({})