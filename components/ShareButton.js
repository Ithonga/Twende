import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const ShareButton = () => {
  const handleShare = async () => {
    try {
      await Share.share({
        message: "sharing method",
        url: "https://www.google.com",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share. Please try again.");
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={handleShare}>
        <Text style={{ color: "white" , backgroundColor:"blue", padding:10, alignSelf:"baseline", borderRadius:50}}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShareButton;

const styles = StyleSheet.create({});
