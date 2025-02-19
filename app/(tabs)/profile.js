// import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native'
// import React, { useState } from 'react'
// import { useAuth, useUser } from '@clerk/clerk-expo';

// const profile = () => {
//   const { user, isSignedIn } = useUser()
//   const { signOut } = useAuth();

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       Alert.alert("Signed Out", "You have successfully signed out.");
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     }
//   };


//   return (
//     <View>
//       <View style={{ alignItems: 'center', marginTop: 20 }}>
//         <Image
//           Image source={{ uri: user?.imageUrl }}
//           style={{ width: 100, height: 100, borderRadius: 50 }}
//         />
//         <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
//           {user?.fullName || 'User'}
//         </Text>
//         <Text>{user?.emailAddresses[0]?.emailAddress}</Text>
//       </View>
//       <View style={styles.container}>
//         <Button title="Sign Out" onPress={handleSignOut} color="#FF5733" />
//       </View>
//     </View>
//   )
// }

// export default profile

// const styles = StyleSheet.create({})

// function signOut() {
//   throw new Error('Function not implemented.');
// }

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const profile = () => {
  return (
    <View>
      <Text>profile</Text>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({})