import { window } from "../../constants/sizes";
import { renderItem } from "../../utils/render-items";
import * as React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { number } from "react-native-gesture-handler";
import { router } from "expo-router";

// Replace this with your actual data, it can be fetched from an API or a database
const images = [
    require("../../assets/bamburi.jpg"),
    require("../../assets/beach.jpeg"),    
    require("../../assets/shanzu.jpg"),    
    require("../../assets/tiwi.jpg"),    
    require("../../assets/watamu.jpg"),    
    require("../../assets/malindi.jpg"),
  ];

function Index() {
  const progress = useSharedValue < number > 0;

  return (
    <View
      id="carousel-component"
      dataSet={{ kind: "basic-layouts", name: "parallax" }}
    >
      <Carousel
        autoPlay={true}
        autoPlayInterval={2000}
        data={images}
        height={258}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={window.width}
        style={{
          width: window.width,
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        onProgressChange={progress}
        renderItem={({ item }) => (
          <TouchableOpacity
            
            activeOpacity={0.8}
          >
            <Image
              source={item}
              style={{
                width: window.width ,
                height: 250,
                borderRadius: 10,
                alignSelf: "center",
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>)}
      />
    </View>
  );
}

export default Index;
