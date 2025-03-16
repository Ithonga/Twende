import React from "react";
import { View, Text, TouchableOpacity, Share } from "react-native";
import colors from "../colors/colors";

const ShareApp = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Check out this amazing tours and travel app for Kenya! 🌍✨\nDownload it now: https://expo.dev/accounts/ithonga/projects/Twende/builds/1a832844-ef3c-4a6d-ba93-3f41cbdbf9ee",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing:", error.message);
    }
  };

  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <TouchableOpacity
        onPress={onShare}
        style={{
          backgroundColor:"red",
          padding: 10,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShareApp;
