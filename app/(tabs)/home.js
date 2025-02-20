import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "../../components/Search";
import SignOutButton from "../../components/SignOutButton"

const home = () => {
  return (
      <SafeAreaView style={styles.container}>
        <View>
          <Header title="Discover" />
          <Search />
          <SignOutButton/>
        </View>
      </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    paddingHorizontal: 10,
  },
});




