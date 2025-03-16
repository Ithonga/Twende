import * as React from "react";
import {
  Text,
  TextInput,
  SafeAreaView,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useAuth, useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import MyButton from "../../components/MyButton";
import Spinner from "react-native-loading-spinner-overlay";
import { Ionicons } from "@expo/vector-icons";
import OTPInput from "../../components/OTPinput";
import { useOAuth } from "@clerk/clerk-expo";
import colors from "../../colors/colors";

export default function SignUpScreen() {
  const { isSignedIn } = useAuth();
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle password visibility
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;
  
    if (password !== showConfirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match. Please try again.");
      return;
    }

    if (isSignedIn) {
      await signOut(); // Ensure the user is signed out before starting a new sign-up
    }
  
    try {
      // Start sign-up process
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });
  
      // Send verification email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
  
      setPendingVerification(true);
    } catch (err) {
      console.error("Sign-Up Error:", err);
  
      if (err.errors && err.errors[0]?.code === "form_identifier_exists") {
        Alert.alert(
          "Account Exists",
          "An account with this email already exists. Please log in instead."
        );
        router.replace("/sign-in");
      } else {
        Alert.alert("Sign-Up Failed", "An error occurred. Please try again.");
      }
    }
  };
  

  const onVerifyPress = async () => {
    if (!isLoaded || isVerifying) return; // Prevent multiple presses while verifying
    setIsVerifying(true); // Set verification in progress state

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        // If verification completed successfully, set active session
        await setActive({ session: signUpAttempt.createdSessionId });
        // Show success alert and redirect to the home page
        Alert.alert(
          "Verification Complete",
          "Your email has been successfully verified."
        );
        router.replace("/home"); // Redirect to home page
      } else {
        // If verification is not complete, show failure alert and redirect to sign-up page
        Alert.alert(
          "Verification Failed",
          "The verification could not be completed. Please try again."
        );
        router.replace("/sign-up"); // Redirect to sign-up page
      }
    } catch (err) {
      // Handle any errors during the verification process
      Alert.alert(
        "Error",
        "An error occurred while trying to verify. Please try again later."
      );
      console.error("Error during verification:", JSON.stringify(err, null, 2));
      router.replace("/sign-up"); // Optionally, redirect back to sign-up page
    } finally {
      setIsVerifying(false); // Reset verification in progress state
    }
  };

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onGoogleSignUp = async () => {
    try {
      const { createdSessionId, signUp, signIn } = await startOAuthFlow();
  
      if (signIn) {
        Alert.alert(
          "Account Already Exists",
          "You already have an account. Redirecting to login."
        );
        router.replace("/sign-in");
        return;
      }
  
      if (signUp && createdSessionId) {
        await setActive({ session: createdSessionId });
        router.replace("/home");
      } else {
        Alert.alert(
          "Sign-Up Failed",
          "Could not complete sign-up. Try using a different method."
        );
      }
    } catch (err) {
      console.error("Google Sign-Up Error:", err);
      Alert.alert("Error", "Could not sign up with Google. Please try again.");
    }
  };
  

  // State to track the verification process
  const [isVerifying, setIsVerifying] = useState(false);

  if (pendingVerification) {
    return (
      <>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.innerContainer}>
              <Spinner visible={loading} />
              <Image
                source={require("../../assets/Logo.png")}
                style={styles.img}
              />

              <Text style={styles.text}>Verify your email</Text>
              <OTPInput
                length={6} // Adjust OTP length if needed
                onComplete={(code) => setCode(code)} // Update code state when complete
              />

              {isVerifying ? (
                <ActivityIndicator size="large" color={colors.BLUE} />
              ) : (
                <>
                  <MyButton
                    onPress={onVerifyPress}
                    title="Verify"
                    color={colors.BLUE}
                    disabled={isVerifying}
                  />
                </>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }

  return (
    <SafeAreaView >
      <KeyboardAvoidingView
        behavior="padding"
      >
        <ScrollView bounces={false}>
          <View style={styles.container}>
            <Spinner visible={loading} />
            <View style={styles.innerContainer}>
              <>
                <Image
                  source={require("../../assets/Logo.png")}
                  style={styles.img}
                />
                <Text style={styles.text}>Create your Account</Text>
                <TextInput
                  autoCapitalize="words" // Capitalize the first letter of each word, which is common for names
                  value={firstName}
                  placeholder="Enter first name"
                  placeholderTextColor="#888"
                  onChangeText={(name) => setFirstName(name)}
                  style={styles.inputField}
                />
                <TextInput
                  autoCapitalize="words" // Capitalize the first letter of each word, which is common for names
                  value={lastName}
                  placeholder="Enter last name"
                  keyboardType="default"
                  placeholderTextColor="#888"
                  onChangeText={(name) => setLastName(name)}
                  style={styles.inputField}
                />
                <TextInput
                  autoCapitalize="none"
                  value={emailAddress}
                  placeholder="Enter email"
                  keyboardType="email-address"
                  placeholderTextColor="#888"
                  onChangeText={(email) => setEmailAddress(email)}
                  style={styles.inputField}
                />

                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#888"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  style={styles.inputField}
                />
                <TextInput
                  value={showConfirmPassword}
                  placeholderTextColor="#888"
                  placeholder="Confirm password"
                  secureTextEntry={!showPassword}
                  onChangeText={setShowConfirmPassword}
                  style={styles.inputField}
                />
                <Pressable
                  onPress={toggleShowPassword}
                  style={styles.iconButton}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color="#6c47ff"
                  />
                </Pressable>

                <MyButton
                  onPress={onSignUpPress}
                  title="Continue"
                  color={colors.BLUE}
                  disabled={undefined}
                ></MyButton>

                <Text style={styles.signupText}>
                  Already have an account?{" "}
                  <TouchableOpacity onPress={() => router.replace("/sign-in")}>
                    <Text style={styles.signupLink}>Login</Text>
                  </TouchableOpacity>
                </Text>
                <Text style={styles.signupText}>- Or sign up with -</Text>

                <TouchableOpacity onPress={onGoogleSignUp} style={styles.btn}>
                  <Image
                    source={require("../../assets/google.webp")}
                    style={styles.icon}
                  />
                  <Text style={styles.btntext}>Sign up with Google</Text>
                </TouchableOpacity>
              </>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
    justifyContent: "center",
    
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
  iconButton: {
    padding: 10,
  },
  img: {
    width: "80%",
    height: 70,
    resizeMode: "contain",
    alignSelf: "center",
    margin: 20,
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
    margin:8
  },
  signupLink: {
    color: "#007bff",
    fontWeight: "bold",
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
    justifyContent: "space-evenly",
    alignSelf: "center",
    margin: 10,
    flexDirection: "row",
    elevation: 3, // Shadow effect for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    width: 40,
    height: 40,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  iconButton: {
    padding: 10,
    marginRight: 10,
  },
});
