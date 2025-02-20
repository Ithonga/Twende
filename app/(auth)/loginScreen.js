import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import MyButton from "../../components/MyButton";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onHandleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Login successful");
      router.replace("/home"); // Navigate to home screen after successful login
    } catch (error) {
      console.error("Login error:", error.message);
      Alert.alert("Login Failed", error.message); // Show detailed error message
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require("../../assets/Logo.png")} style={styles.img} />
        <Text style={styles.text}>Login to your Account</Text>

        <TextInput
          autoCapitalize="none"
          placeholder="example@gmail.com"
          placeholderTextColor="#888"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={setEmail}
          style={styles.inputField}
        />

        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          textContentType="password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          style={styles.inputField}
        />

        <MyButton
          onPress={onHandleLogin}
          title={loading ? <ActivityIndicator size={"small"}/> : "Login"}
          color={"red"}
          disabled={loading}
        />

        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Link href="/signUpScreen">
            <Text style={styles.signupLink}>Sign up</Text>
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
  },
  forgot: {
    color: "red",
  },
});

export default LoginScreen;
