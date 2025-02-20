import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useRouter } from "expo-router";
import colors from "../colors/colors";
import MyButton from "../components/MyButton";

const { width, height } = Dimensions.get("window");

const OnBoardingScreen = () => {
  const router = useRouter();

  const handleFinish = () => {
    router.replace("/home");
  };

  const DoneButton = ({ ...props }) => (
    <TouchableOpacity style={styles.button} {...props} onPress={handleFinish}>
      <Text style={styles.buttonText}>Get Started</Text>
    </TouchableOpacity>
  );

  const SkipButton = ({ ...props }) => (
    <TouchableOpacity style={styles.button} {...props} onPress={handleFinish}>
      <Text style={styles.buttonText}>Skip</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Onboarding
        DoneButtonComponent={DoneButton}
        SkipButtonComponent={SkipButton}
        bottomBarColor="transparent"
        bottomBarHighlight={false} // Removes default shadow
        bottomBarContainerStyle={styles.bottomBar}
        containerStyles={{ flex: 1 }} // Ensures full-screen background
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <ImageBackground
                source={require("../assets/icon.png")}
                style={styles.imageBackground}
                resizeMode="cover"
              />
            ),
            title: "Welcome",
            subtitle: "Discover amazing features in our app!",
          },
          {
            backgroundColor: "#fdeb93",
            image: (
              <ImageBackground
                source={require("../assets/icon.png")}
                style={styles.imageBackground}
                resizeMode="cover"
              />
            ),
            title: "Stay Organized",
            subtitle: "Manage your tasks efficiently with our tools.",
          },
          {
            backgroundColor: "#e9bcbe",
            image: (
              <ImageBackground
                source={require("../assets/icon.png")}
                style={styles.imageBackground}
                resizeMode="cover"
              />
            ),
            title: "Get Started",
            subtitle: "Let's begin your journey with us!",

          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
    paddingVertical: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: colors.BLUE,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  imageBackground: {
    width: width * 0.9,
    height: height * 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OnBoardingScreen;
