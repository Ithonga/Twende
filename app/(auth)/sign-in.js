import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useAuth, useOAuth, useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import MyButton from "../../components/MyButton";
import { Ionicons } from "@expo/vector-icons";
import { useGoogleSignIn } from "../../utils/authHelpers";
import colors from "../../colors/colors";

//   const handleGoogleSignIn = useGoogleSignIn();

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/home");
      console.log(isSignedIn);
    }
  }, [isSignedIn]);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Toggle the state
  };

  // Handles email/password sign-in
  const onSignInPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        Alert.alert("Success", "Signed in successfully!");
        router.replace("/home");
      } else {
        Alert.alert("Sign-in failed", "Please try again.");
      }
    } catch (error) {
      Alert.alert(
        "Sign-in Error",
        error.errors?.[0]?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  // const onGoogleSignIn = async () => {
  //   try {
  //     const { createdSessionId, signIn } = await startOAuthFlow();
  
  //     // Ensure the user is signing in and not signing up
  //     if (signIn && createdSessionId) {
  //       await setActive({ session: createdSessionId });
  //       router.replace("/home"); // Redirect to home after successful sign-in
  //     } else {
  //       Alert.alert(
  //         "Sign-In Failed",
  //         "No account found. Please sign up first."
  //       );
  //     }
  //   } catch (err) {
  //     console.error("Google Sign-In Error:", err);
  //     Alert.alert("Error", "Could not sign in with Google. Please try again.");
  //   }
  // };

  const onGoogleSignIn = async () => {
    try {
      const { createdSessionId, signIn, signUp } = await startOAuthFlow();
  
      if (signIn && createdSessionId) {
        // User has an account → Sign them in
        await setActive({ session: createdSessionId });
        router.replace("/home");
      } else if (signUp) {
        // User does not have an account → Ask them to sign up
        Alert.alert(
          "No Account Found",
          "It looks like you don’t have an account. Please sign up first.",
          [{ text: "Sign Up", onPress: () => router.replace("/sign-up") }]
        );
      } else {
        // Something went wrong
        Alert.alert("Sign-In Failed", "Could not sign in. Please try again.");
      }
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      Alert.alert("Error", "Could not sign in with Google. Please try again.");
    }
  };
  
  

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView bounces={false}>
          <View style={styles.container}>
            <Spinner visible={loading} />
            <View style={styles.innerContainer}>
              {/* <Text style={styles.text}>ACACIA</Text> */}
              <Image
                source={require("../../assets/Logo.png")}
                style={styles.img}
              />
              <Text style={styles.text}>Login to your Account</Text>
              <TextInput
                autoCapitalize="none"
                placeholder="example@gmail.com"
                keyboardType="email-address"
                placeholderTextColor="#888"
                value={emailAddress}
                onChangeText={setEmailAddress}
                style={styles.inputField}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword
                style={styles.inputField}
              />
              <Pressable onPress={toggleShowPassword} style={styles.iconButton}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"} // Toggle between eye and eye-off icons
                  size={24}
                  color="#6c47ff"
                />
              </Pressable>
              <MyButton
                onPress={onSignInPress}
                title="Login"
                color={colors.BLUE}
                disabled={loading}
              />

              <Text style={styles.signupText}>
                Don't have an account?{" "}
                <TouchableOpacity onPress={() => router.replace("/sign-up")}>
                  <Text style={styles.signupLink}>Sign up</Text>
                </TouchableOpacity>
              </Text>

              <TouchableOpacity
                asChild
                onPress={() => router.push("/reset")}
                style={styles.button}
              >
                <Text style={styles.forgot}>Forgot password?</Text>
              </TouchableOpacity>

              <Text style={styles.signupText}>- Or sign in with -</Text>

              <TouchableOpacity onPress={onGoogleSignIn} style={styles.btn}>
                <Image
                  source={require("../../assets/google.webp")}
                  style={styles.icon}
                />
                <Text style={styles.btntext}>Sign in with Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes full screen
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "100%", // Adjust width for responsiveness
    height: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
  },
  inputField: {
    marginVertical: 10,
    height: 60,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "white",
    elevation: 3, // Shadow effect for Android
    shadowColor: "black", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 40,
    gap: "15%",
  },
  btn: {
    width: "60%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    margin: 10,
    flexDirection: "row",
    elevation: 3, // Shadow effect for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  img: {
    width: "80%",
    height: 70,
    resizeMode: "contain",
    alignSelf: "center",
    margin: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
  text: {
    fontSize: 25,
    textAlign: "left",
    fontWeight: "bold",
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  signupLink: {
    color: "#007bff",
    fontWeight: "bold",
  },
  button: {
    margin: 8,
    alignItems: "center",
    color: "#007bff",
  },
  forgot: {
    color: "red",
  },
  iconButton: {
    padding: 10,
  },
});

export default Login;
