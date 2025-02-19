import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import colors from "../colors/colors";

const NotFoundScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>404 - Page Not Found</Text>
      <Text style={styles.subtitle}>Oops! The page you are looking for doesn't exist.</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.replace("/")}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: colors.GRAY,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.BLUE,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NotFoundScreen;
