import { useEffect } from "react";
import { View, Text, ActivityIndicator, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Colors from "../colors/colors";
import { useAuth } from "@clerk/clerk-expo";
import * as Updates from "expo-updates";

export default function SplashScreen() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth(); // Ensure authentication is loaded
  const {
    
    isUpdatePending
  } = Updates.useUpdates();

  useEffect(() => {
    if (isUpdatePending) {
      // Update has successfully downloaded; apply it now
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

  useEffect(() => {
    if (isLoaded) {
      const timeout = setTimeout(() => {
        if (isSignedIn) {
          router.replace("/home"); // Redirect to home if signed in
        } else {
          router.replace("/(auth)/sign-in"); // Redirect to sign-in if not signed in
        }
      }, 2000); // 1-second delay

      return () => clearTimeout(timeout); // Cleanup to avoid memory leaks
    }
  }, [isSignedIn, isLoaded]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/adaptive-icon.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text style={styles.title}>Twende</Text>
      <ActivityIndicator size="small" color={"#fff"} />

      <View style={styles.footer}>
        <Text style={{ color: "#fff", fontSize: 14 }}>powered by:</Text>
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
