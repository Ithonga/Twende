import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import { CATEGORIES } from "../../Data";

const TourDetails = () => {
  const { id } = useLocalSearchParams(); // Get dynamic tour ID
  const tour = CATEGORIES.flatMap((category) => category.tours).find((t) => t.id == id);

  if (!tour) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Tour Not Found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={tour.imageUrl} style={styles.image} />
      <Text style={styles.heading}>{tour.name}</Text>
      <Text style={styles.price}>From ${tour.price}</Text>
      <Text style={styles.description}>{tour.description}</Text>
    </View>
  );
};

export default TourDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "bold",
    marginVertical: 5,
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  errorText: {
    fontSize: 20,
    color: "red",
    fontWeight: "bold",
  },
});
