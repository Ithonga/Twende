import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

const Header2 = ({ title }) => {
  return (
    <View style={styles.header}>
      <Ionicons name="arrow-back" size={24} color="black" onPress={() => router.back()}/>
      <Text style={styles.headertext}>{title}</Text>
      <MaterialIcons
        name="settings-suggest"
        size={30}
        color="black"
        onPress={() => router.push("/settings")}
      />
    </View>
  );
};

export default Header2;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    margin: 20,
  },
  headertext: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
});