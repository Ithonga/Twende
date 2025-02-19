import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useRouter } from "expo-router";


const GetStartedSlider = () => {
  const router = useRouter();

  const handleFinish = () => {
    router.replace("/home");
  };

  const DoneButton = ({ ...props }) => (
    <TouchableOpacity style={{ marginRight: 20 }} {...props} onPress={handleFinish}>
      <Text style={{ fontSize: 16, color: "#007AFF" }}>Get Started</Text>
    </TouchableOpacity>
  );

  const SkipButton = ({ ...props }) => (
    <TouchableOpacity style={{ marginLeft: 20 }} {...props} onPress={handleFinish}>
      <Text style={{ fontSize: 16, color: "#007AFF" }}>Skip</Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      DoneButtonComponent={DoneButton}
      SkipButtonComponent={SkipButton}
      pages={[
        {
          backgroundColor: "#fff",
          image: <Image source={require("../assets/icon.png")} style={{ width: "100%", height: "100%" }} />,
          title: "Welcome",
          subtitle: "Discover amazing features in our app!",
        },
        {
          backgroundColor: "#fdeb93",
          image: <Image source={require("../assets/icon.png")} style={{ width: "100%", height: "100%" }} />,
          title: "Stay Organized",
          subtitle: "Manage your tasks efficiently with our tools.",
        },
        {
          backgroundColor: "#e9bcbe",
          image: <Image source={require("../assets/icon.png")} style={{ width: "100%", height: "100%" }} />,
          title: "Get Started",
          subtitle: "Let's begin your journey with us!",
        },
      ]}
    />
  );
};

export default GetStartedSlider;
