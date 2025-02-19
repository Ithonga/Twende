import { View, Text, Button, ImageBackground, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import MyButton from "../components/MyButton";
import BackGround from "../assets/back.jpeg";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackGround}
        style={styles.backgroundimage}
      >
        <Text style={styles.text}>Discover your dream destination!</Text>
        <MyButton title="Welcome" onPress={() => router.push("/onboarding")}
        />
      
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundimage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
    position: "absolute",
    top: 100,
  },
})