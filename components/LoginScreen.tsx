import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../colors/colors'
import { useOAuth } from '@clerk/clerk-expo'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import { ScrollView } from 'react-native'
import { Dimensions } from 'react-native'

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

const SigninScreen = () => {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
  // Get the screen's width and height
  const { width, height } = Dimensions.get('window');
  const handleSignIn = React.useCallback(async () => {
    try {
      // Start the OAuth flow
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        // where we are directed when you log in
        redirectUrl: Linking.createURL('/explore', { scheme: 'twende' }),
      });

      // Handle successful sign-in
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        Alert.alert("Twende Sasa!", "Welcome back!", [{ text: "OK" }]);


      } else {
        // Handle other scenarios (e.g., MFA or incomplete sign-in)
        Alert.alert("Action Required", "Please complete the sign-in process.", [{ text: "OK" }]);
      }
    } catch (err) {
      // Handle errors
      console.error("Sign In Error:", err);
      Alert.alert("Sign In Error", "Something went wrong. Please try again.", [{ text: "Try Again" }]);
    }
  }, []);
  return (

    <>
      <View>
        <Image
          style={[styles.image, { height: height * 0.4 }]} // Adjust image height dynamically based on screen height
          source={require('../assets/login.jpg')}
        />
      </View>

      {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
      <View style={[styles.logincontainer, { height: height * 0.6 }]}>  {/* Adjust login container height dynamically */}
        <Text style={styles.text}>Explore your journey only with us</Text>

        <Text
          style={{
            fontWeight: 'semibold',
            paddingHorizontal: 40,
            fontSize: 20,
            textAlign: 'center',
            marginTop: 15,
            color: colors.PRIMARY
          }}>All your Vacations Destinations are here enjoy your holiday.</Text>
        <TouchableOpacity onPress={handleSignIn} style={styles.btnContainer}>
          <Text style={styles.btnText}>GET STARTED</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 13,
            textAlign: 'center',
            marginTop: 15,
            color: colors.GRAY
          }}>By continuing you agree to our terms and conditions</Text>
      </View>
      {/* </ScrollView > */}
    </>
  )
}

export default SigninScreen

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 600,
  },
  logincontainer: {
    padding: 25,
    marginTop: 30,
    backgroundColor: "white",
    height: 300,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  text: {
    fontSize: 38,
    fontWeight: "bold",
    textAlign: 'center',
  },
  btnContainer: {
    backgroundColor: colors.BLUE,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})


