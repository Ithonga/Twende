import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../firebaseConfig"; // Firebase Auth
import Colors from "../colors/colors";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Store first-time user flag

export default function SplashScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      setTimeout(async () => {
        const user = auth.currentUser;
        const firstTimeUser = await AsyncStorage.getItem("firstTimeUser");

        if (user) {
          router.replace("/home"); // ✅ Logged in → Home
        } else if (firstTimeUser === null) {
          await AsyncStorage.setItem("firstTimeUser", "true"); // Mark user as seen
          router.replace("/welcome"); // 🚀 First time user → Welcome
        } else {
          router.replace("/loginScreen"); // 🔄 Returning user → Login
        }

        setLoading(false);
      }, 2000); // Show splash for 2s
    };

    checkUser();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/adaptive-icon.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text style={styles.title}>Twende</Text>
      <ActivityIndicator size="small" color={"#fff"} />

      <View style={styles.footer}>
        <Text style={{ color: "#fff", fontSize: 14 }}>Powered by:</Text>
        <Image
          source={require("../assets/Logo.png")}
          style={{ height: 30, resizeMode: "contain" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BLUE,
  },
  title: {
    color: Colors.WHITE,
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 20,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    alignItems: "center",
  },
});
