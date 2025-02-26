import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header2 from "../../components/Header2";
import { SafeAreaView } from "react-native-safe-area-context";

const Favourites = () => {
  return (
    <SafeAreaView>
      <View>
        <Header2 title='Favourites' />
      </View>
    </SafeAreaView>
  );
};

export default Favourites;

const styles = StyleSheet.create({});
