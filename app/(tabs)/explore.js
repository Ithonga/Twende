import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";


const explore = () => {
  return (
    
      <SafeAreaView style={styles.container}>
        <View>
          <Header title="Explore" />
        </View>
      </SafeAreaView>

  );
};

export default explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    paddingHorizontal: 10,
  },
});
