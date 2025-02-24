import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../colors/colors";
import { ScrollView } from "react-native";
export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={styles.headertext}>My Profile</Text>
          <Ionicons name="settings-outline" size={24} color="black" />
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}  >
        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <Image
            source={require("../../assets/user.jpg")}
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>Charlotte King</Text>
            <Text style={styles.profileEmail}>@johnkinggraphics</Text>

            <Link href="/edit-profile" asChild>
              <TouchableOpacity style={styles.editcontainer}>
                <Text style={styles.edittext}>Edit Profile</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menu}>
          {[
            "Favourites",
            "Downloads",
            "Language",
            "Location",
            "Subscription",
            "Clear Cache",
            "Clear History",
            "Favourites",
            "Downloads",
            "Language",
            "Location",
            "Subscription",
            "Clear Cache",
            "Clear History",
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuitem}
            >
              <Text style={styles.menuitemtext}>{item}</Text>
              <Ionicons name="chevron-forward" size={20} color="gray" />
            </TouchableOpacity>
          ))}

          {/* Logout */}
          <TouchableOpacity className="flex-row items-center py-3">
            <Text className="text-red-500 text-lg flex-1">Log out</Text>
            <Ionicons name="log-out-outline" size={20} color="red" />
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headertext: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  profileInfo: {
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: colors.GRAY,
  },
  editcontainer: {
    backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
    borderRadius: 50,
  },
  edittext: {
    color: "white",
    fontWeight: "bold",
  },
  profileDetails: {
    marginLeft: 20,
    flexDirection: "column",
  },
  menu: {
    marginTop: 16,
    marginBottom: 20,
  },
  menuitem: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY,
  },
  menuitemtext: {
    flex: 1,
    color: colors.GRAY,
    fontSize: 16,
    marginLeft: 10,
  },
});