import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "../../components/Search";
import Header from "../../components/Header";
import ShareButton from "../../components/ShareButton";
import ParallaxCorousel from "../../components/corouselComponents/ParallaxCorousel";

const home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Header */}
        <Header title="Discover" />
        {/* Search Bar */}
        <Search />
        {/* Content */}
        <ParallaxCorousel />

        <View>
          <Text>Categories</Text>

          <ShareButton/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
