import * as React from "react";
import {
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { useAuth, useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import MyButton from "../../components/MyButton";
import Spinner from "react-native-loading-spinner-overlay";
import { Ionicons } from "@expo/vector-icons";
import OTPInput from "../../components/OTPinput";
import { useOAuth } from "@clerk/clerk-expo";

export default function SignUpScreen() {
  const { isSignedIn } = useAuth();
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  // const [firstName, setFirstName] = React.useState('')
  // const [lastName, setLastName] = React.useState('')
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
      Alert.alert(
        "Password Mismatch",
        "Passwords do not match. Please try again."
      );
      return;
    }

    // Start sign-up process using firstName, lastName, email and password provided
    try {
      //this are the fields i have accepted in the clerk app (ways of authentication)
      await signUp.create({
        // firstName,
        // lastName,
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
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

  const onGoogleSignIn = async () => {
    try {
      const { createdSessionId, signIn, signUp } = await startOAuthFlow();
  
      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        router.replace("/home"); // Redirect to home after successful sign-in
      } else {
        Alert.alert("Sign-In Failed", "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      Alert.alert("Error", "Could not sign in with Google. Please try again.");
    }
  };

  // State to track the verification process
  const [isVerifying, setIsVerifying] = useState(false);

  if (pendingVerification) {
    return (
      <>
        <View style={styles.container}>
          <Spinner visible={loading} />
          <Image source={require("../../assets/Logo.png")} style={styles.img} />

          <Text style={styles.text}>Verify your email</Text>
          <OTPInput
            length={6} // Adjust OTP length if needed
            onComplete={(code) => setCode(code)} // Update code state when complete
          />

          {isVerifying ? (
            <ActivityIndicator size="large" color="#6c47ff" />
          ) : (
            <>
              <MyButton
                onPress={onVerifyPress}
                title="Verify"
                color={"#6c47ff"}
                disabled={isVerifying}
              />
            </>
          )}
        </View>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <View style={styles.innerContainer}>
        <>
          <Image source={require("../../assets/Logo.png")} style={styles.img} />
          <Text style={styles.text}>Create your Account</Text>
          {/* <TextInput
                  autoCapitalize="words" // Capitalize the first letter of each word, which is common for names
                  value={firstName}
                  placeholder="Enter first name"
                  onChangeText={(name) => setFirstName(name)}
                  style={styles.inputField}     
              />
              <TextInput
                  autoCapitalize="words" // Capitalize the first letter of each word, which is common for names
                  value={lastName}
                  placeholder="Enter last name"
                  onChangeText={(name) => setLastName(name)}
                  style={styles.inputField}
              /> */}
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter email"
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
          <Pressable onPress={toggleShowPassword} style={styles.iconButton}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#6c47ff"
            />
          </Pressable>

          <MyButton
            onPress={onSignUpPress}
            title="Continue"
            color={"#6c47ff"}
            disabled={undefined}
          ></MyButton>

          <Text style={styles.signupText}>
            Already have an account?{" "}
            <Link href="/sign-in">
              <Text style={styles.signupLink}>Sign In</Text>
            </Link>
          </Text>
          <TouchableOpacity onPress={onGoogleSignIn} style={styles.btn}>
            <Image
              source={require("../../assets/Logo.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </>
      </View>
    </View>
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
    padding: 20,
    paddingTop: 50,
    borderRadius: 10,
    elevation: 3, // Shadow effect
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
  iconButton: {
    padding: 10,
  },
  img: {
    width: "80%",
    height: 70,
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: 50,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 40,
    gap: "15%",
  },
  btn: {
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, // Shadow effect for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    width: 50,
    height: 50,
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
