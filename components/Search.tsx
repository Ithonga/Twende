import React, { useState } from "react";
import { View, TextInput, FlatList, Text, Image, StyleSheet } from "react-native";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data
  const destinations = [
    {
      id: "1",
      name: "Mountain Escape",
      price: 150,
      rating: 4.5,
      imageUrl: require("../assets/beach.jpeg"),
    },
    {
      id: "2",
      name: "Beach Paradise",
      price: 200,
      rating: 4.8,
      imageUrl: require("../assets/login.jpg"),
    },
    {
      id: "3",
      name: "City Lights",
      price: 120,
      rating: 4.2,
      imageUrl: require("../assets/beach.jpeg"),
    },
  ];

  // Filter destinations based on search query
  const filteredDestinations = destinations.filter((dest) =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search destinations..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {/* Show Results Only When Search Query Exists */}
      {searchQuery.length > 0 && (
        <FlatList
          data={filteredDestinations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={item.imageUrl} style={styles.image} />
              <View style={styles.cardContent}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.price}>Price: ${item.price}</Text>
                <Text style={styles.rating}>Rating: ⭐ {item.rating}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#f5f5f5",
  },
  searchBar: {
    height: 50,
    borderColor: "#ccc",
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cardContent: {
    marginLeft: 10,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    color: "#555",
    marginBottom: 5,
  },
  rating: {
    color: "#888",
  },
});

export default App;
