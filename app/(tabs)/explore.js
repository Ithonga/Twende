import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "../../components/Search";
import Header from "../../components/Header";
import { CATEGORIES } from "../../Data";
import colors from "../../colors/colors";
import { router } from "expo-router";

const home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Header */}
        <Header title="Explore" />

        {/* Search bar */}
        <Search />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            {CATEGORIES.map((category) => (
              <View key={category.id}>
                <Text style={styles.subheading}>{category.name}</Text>

                <View>
                  {category.tours.length === 0 ? (
                    <Text>No tours available</Text>
                  ) : (
                    category.tours.map((tour) => (
                      <TouchableOpacity
                        key={tour.id}
                        onPress={() => router.push(`/tour/${tour.id}`)}
                      >
                        <View style={styles.card}>
                          <Image source={tour.imageUrl} style={styles.image} />
                          <View style={styles.cardContent}>
                            <Text style={styles.tourName}>{tour.name}</Text>
                            <Text style={styles.price}>${tour.price}</Text>
                            <Text
                              ellipsizeMode="tail"
                              numberOfLines={1}
                              style={styles.description}
                            >
                              {tour.description}
                            </Text>
                            <Text>⭐⭐⭐⭐{tour.rate}</Text>
                            <Text> 🧑🧑‍🦲{tour.joined} Persons Joined</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))
                  )}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 5,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  subheading: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 16,
  },
  price: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    marginVertical: 5,
    backgroundColor: colors.BLUE,
    alignSelf: "baseline",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  cardContent: {
    marginHorizontal: 8,
    justifyContent: "space-between",
    flex: 1,  // Allow this content to take up the remaining space
  },
  tourName: {
    fontWeight: "bold",
    fontSize: 15,
  },
  description: {
    textAlign: "left",
    width: '75%',  // Use percentage width to make it flexible across different screen sizes
  },
});

export default home;