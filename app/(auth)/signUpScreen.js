import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  Image,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import MyButton from "../../components/MyButton";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onHandleSignUp = () => {
    if (email !== "" && password !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Send email verification
          sendEmailVerification(userCredential.user)
            .then(() => {
              Alert.alert(
                "Verification Email Sent",
                "Please check your email to verify your account."
              );
              // Redirect to home after successful sign-up
              router.replace("/home");
            })
            .catch((error) => Alert.alert("Verification failed", error.message));
        })
        .catch((error) => Alert.alert("Sign-up failed", error.message));
    } else {
      Alert.alert("Error", "Email and password cannot be empty.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require("../../assets/Logo.png")} style={styles.img} />
        <Text style={styles.text}>Create your Account</Text>
        <TextInput
          autoCapitalize="none"
          placeholder="example@gmail.com"
          placeholderTextColor="#888"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.inputField}
        />
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          textContentType="password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.inputField}
        />
        <MyButton onPress={onHandleSignUp} title="Sign Up" disabled={false} />

        <Text style={styles.signupText}>
          Already have an account?{" "}
          <Link href="/loginScreen">
            <Text style={styles.signupLink}>Login</Text>
          </Link>
        </Text>

        <Link href="/reset" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.forgot}>Forgot password?</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "100%",
    height: "100%",
    padding: 20,
    paddingTop: 50,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#f0f0f0",
  },
  inputField: {
    marginVertical: 10,
    height: 60,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    fontSize: 16,
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
  button: {
    margin: 8,
    alignItems: "center",
    color: "#007bff",
  },
  forgot: {
    color: "red",
  },
});

export default SignUpScreen;
