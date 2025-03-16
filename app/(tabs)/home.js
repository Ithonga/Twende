import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "../../components/Search";
import Header from "../../components/Header";
import ShareButton from "../../components/ShareButton";
import ParallaxCorousel from "../../components/corouselComponents/ParallaxCorousel";
import { CATEGORIES } from "../../Data";
import colors from "../../colors/colors";
import { router } from "expo-router";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Header */}
        <Header title="Discover" />

       

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
        >
          {/* Carousel */}
          <ParallaxCorousel />

          <View>
            <Text style={{ fontWeight: "bold", fontSize: 30 }}>Categories</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.buttonContainer}>
                {CATEGORIES.map((_category, index) => (
                  <TouchableOpacity
                    key={_category.id}
                    style={[
                      styles.btn,
                      index === activeCategory ? styles.activeBtn : null,
                    ]}
                    onPress={() => setActiveCategory(index)}
                  >
                    <Text
                      style={{
                        color: index === activeCategory ? "#fff" : "#000",
                        fontSize: 16,
                      }}
                    >
                      {_category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Ensure category exists before accessing tours */}
            {CATEGORIES[activeCategory] ? (
              <>
                <Text style={styles.subheading}>
                  {CATEGORIES[activeCategory].name} Tours
                </Text>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.tourContainer}
                >
                  {CATEGORIES[activeCategory].tours &&
                  CATEGORIES[activeCategory].tours.length > 0 ? (
                    CATEGORIES[activeCategory].tours.map((tour) => (
                      <TouchableOpacity
                        key={tour.id}
                        onPress={() => router.push(`/tour/${tour.id}`)}
                      >
                        <View style={styles.tourCard}>
                          <Image source={tour.imageUrl} style={styles.image} />
                          <Text style={styles.tourName}>{tour.name}</Text>
                          <Text style={styles.price}>From ${tour.price}</Text>
                          <Text ellipsizeMode="tail" numberOfLines={2} style={styles.description}>
                            {tour.description}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={styles.noToursText}>No tours available</Text>
                  )}
                </ScrollView>
              </>
            ) : (
              <Text style={styles.noToursText}>Category not found</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 90, // To accommodate the bottom bar
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  activeBtn: {
    backgroundColor: colors.BLUE,
  },
  btn: {
    padding: 10,
    margin: 5,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
  },
  subheading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
  },
  tourContainer: {
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  tourCard: {
    padding: 0,
    width: 200,
    borderRadius: 10,
    marginRight: 20,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 0,
    marginBottom: 8,
  },
  tourName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    padding: 10,
  },
  noToursText: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    color: "gray",
  },
});
