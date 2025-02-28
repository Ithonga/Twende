import React, { useState } from "react";
import { View, TextInput, FlatList, Text, Image, StyleSheet } from "react-native";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // Filter destinations based on search query

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search destinations..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: "",
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
