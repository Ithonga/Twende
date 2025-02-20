import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  Image,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import MyButton from "../../components/MyButton";
import { useState } from "react";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login successful"))
        .catch((error) => Alert.alert("Login failed", error.message));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* <Text style={styles.text}>ACACIA</Text> */}
        <Image source={require("../../assets/Logo.png")} style={styles.img} />
        <Text style={styles.text}>Login to your Account</Text>
        <TextInput
          autoCapitalize="none"
          placeholder="example@gmail.com"
          placeholderTextColor="#888"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={false}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.inputField}
        />
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          autoCorrect={false}
          textContentType="password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.inputField}
        />
        <MyButton
          onPress={onHandleLogin}
          title="Login"
          color={"#6c47ff"}
          disabled={false}
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
  img: {
    width: "80%",
    height: 70,
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: 50,
  },
  icon: {
    width: 50,
    height: 50,
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
export default LoginScreen;
