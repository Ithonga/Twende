import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { CATEGORIES } from "../../Data";

export default function TourDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Find the tour
  let tour;
  for (const category of CATEGORIES) {
    tour = category.tours.find((t) => t.id.toString() === id);
    if (tour) break;
  }

  if (!tour) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Tour not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={tour.imageUrl} style={styles.image} />
      <Text style={styles.title}>{tour.name}</Text>
      <Text style={styles.description}>{tour.description}</Text>
      <Text style={styles.price}>{tour.price}</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e63946",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});
