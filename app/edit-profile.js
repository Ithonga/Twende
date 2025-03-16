import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import colors from "../colors/colors";
import { useState } from "react";

export default function EditProfileScreen() {
  const { user } = useUser();
  const [name, setName] = useState(user?.firstName);
  const [email, setEmail] = useState(user?.email);
  const [Password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headertext}>Edit Profile</Text>
          <Ionicons name="checkmark" size={24} color="green" />
        </View>

        {/* Profile Picture */}
        <View style={styles.profilePicture}>
          <Image
            source={
              user?.imageUrl
                ? { uri: user.imageUrl }
                : require("../assets/user.jpg")
            }
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraicon}>
            <Ionicons name="camera" size={18} color="black" />
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        {[
          { label: "Name", value: { setName } },
          { label: "E-mail Address", value: { setEmail } },
          { label: "User Name", value: "@johnkinggraphics" },
          { label: "Password", value: { setPassword }, isPassword: true },
          { label: "Phone Number", value: "+91 6895312" },
        ].map((item, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>{item.label}</Text>
            <View style={styles.input}>
              <TextInput
                placeholderTextColor={colors.GRAY}
                value={item.value}
                secureTextEntry={item.isPassword}
                style={styles.inputField}
                editable={!item.isPassword}
              />
              {item.isPassword && (
                <Ionicons name="eye-outline" size={20} color="gray" />
              )}
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
    margin: 10,
  },
  headertext: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraicon: {
    position: "absolute",
    right: 140,
    bottom: 8,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.PRIMARY,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.GRAY,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  inputField: {
    flex: 1,
    marginLeft: 10,
  },
  profilePicture: {
    alignItems: "center",
    marginBottom: 20,
  },
});
