import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { StyleSheet, Image } from "react-native";
import React from "react";
import Colors from "../colors/colors";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/www");
    }, 20000000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/adaptive-icon.png")}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Text
        style={{
          color: Colors.WHITE,
          fontSize: 50,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Twende
      </Text>

      <ActivityIndicator size="small" color={"#fff"} />
      <View style={{ position: "absolute", bottom: 30, alignItems: "center" }}>
        <Text style={{ color: "#fff", fontSize: 14 }}>powered by:</Text>

        <Image
          source={require("../assets/Logo.png")}
          style={{
            height: 30,
            resizeMode: "contain",
          }}
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
});
