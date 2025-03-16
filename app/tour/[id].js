// import { useLocalSearchParams } from "expo-router";
// import { View, Text, Image, StyleSheet } from "react-native";
// import { CATEGORIES } from "../../Data";

// const TourDetails = () => {
//   const { id } = useLocalSearchParams(); // Get dynamic tour ID
//   const tour = CATEGORIES.flatMap((category) => category.tours).find((t) => t.id == id);

//   if (!tour) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>Tour Not Found!</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Image source={tour.imageUrl} style={styles.image} />
//       <Text style={styles.heading}>{tour.name}</Text>
//       <Text style={styles.price}>From ${tour.price}</Text>
//       <Text style={styles.description}>{tour.description}</Text>
//     </View>
//   );
// };

// export default TourDetails;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   image: {
//     width: "100%",
//     height: 250,
//     borderRadius: 10,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginTop: 10,
//   },
//   price: {
//     fontSize: 18,
//     color: "#007AFF",
//     fontWeight: "bold",
//     marginVertical: 5,
//   },
//   description: {
//     fontSize: 16,
//     color: "#555",
//     textAlign: "center",
//   },
//   errorText: {
//     fontSize: 20,
//     color: "red",
//     fontWeight: "bold",
//   },
// });

import { router, useLocalSearchParams } from "expo-router";
import { CATEGORIES } from "../../Data";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";


const HEADER_MAX_HEIGHT = 400;
const HEADER_MIN_HEIGHT = 70;
const { width } = Dimensions.get("window");

export default function ParallaxScrollView() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { id } = useLocalSearchParams(); // Get dynamic tour ID
  const tour = CATEGORIES.flatMap((category) => category.tours).find(
    (t) => t.id == id
  );

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      {/* Parallax Image Header */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Image source={tour.imageUrl} style={styles.headerImage} />
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        {/* Save Icon */}
        <TouchableOpacity style={styles.saveButton}>
          <Ionicons name="bookmark-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.heading}>{tour.name}</Text>
          <Text style={styles.location}>Nairobi/Kenya</Text>
          <View style={styles.row}>
            <Text style={styles.location}>📍Nairobi</Text>

            <Text style={styles.rating}>⭐{tour.rate} (2498)</Text>
            <Text style={styles.price}> ${tour.price}/Person</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={tour.imageUrl} style={{height:60, width:60, borderRadius:15}} />
          <Image source={tour.imageUrl} style={{height:60, width:60, borderRadius:15}} />
          <Image source={tour.imageUrl} style={{height:60, width:60, borderRadius:15}} />
          <Image source={tour.imageUrl} style={{height:60, width:60, borderRadius:15}} />
          <Image source={tour.imageUrl} style={{height:60, width:60, borderRadius:15}} />

        </View>

        {/* About Destination */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About Destination</Text>
          <Text style={styles.description}>
            {tour.description} <Text style={styles.readMore}>Read More</Text>
          </Text>
        </View>

        {/* Book Now Button */}
        <TouchableOpacity style={styles.bookNowButton} onPress={() => router.back()} >
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    overflow: "hidden",
  },
  headerImage: {
    width: width,
    height: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  saveButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  scrollContent: {
    paddingTop: HEADER_MAX_HEIGHT,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "#fff",
    marginTop: -30,
    borderRadius: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginVertical: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    justifyContent: "space-between",
  },
  rating: {
    fontSize: 16,
    marginLeft: 5,
    color: "#444",
  },
  price: {
    fontSize: 16,
    color: "#2e9dff",
    marginLeft: 15,
  },
  aboutSection: {
    padding: 20,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  readMore: {
    color: "#2e9dff",
    fontWeight: "bold",
  },
  bookNowButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  bookNowText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding:10
  },
});
