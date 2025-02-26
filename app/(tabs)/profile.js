import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../colors/colors";
import { ScrollView } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import SignOutButton from "../../components/SignOutButton";
import ShareButton from "../../components/ShareButton";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { user } = useUser();

  const menuitems = [
    { name: "Favourites", route: "/profileScreens/Favourites" },
    { name: "Downloads", route: "/profileScreens/Downloads" },
    { name: "Language", route: "/profileScreens/Language" },
    { name: "Location", route: "/profileScreens/Location" },
    { name: "About", route: "/profileScreens/About" },
    { name: "Feedback", route: "/profileScreens/Feedback" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Header */}
        <View style={styles.header}>
          {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
          <Text style={styles.headertext}>My Profile</Text>
          <MaterialIcons name="settings-suggest" size={30} color="black" onPress={() => router.push("/settings")}/>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
        >
          {/* Profile Info */}
          <View style={styles.profileInfo}>
            <Image
              source={
                user?.imageUrl
                  ? { uri: user.imageUrl }
                  : require("../../assets/user.jpg")
              }
              style={styles.profileImage}
            />
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>{user.fullName}.</Text>
              <Text style={styles.profileEmail}>
                {user?.emailAddresses[0].emailAddress}
              </Text>

              <Link href="/edit-profile" asChild>
                <TouchableOpacity style={styles.editcontainer}>
                  <Text style={styles.edittext}>Edit Profile</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          {/* Menu Options */}
          <View style={styles.menu}>
            {menuitems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuitem}
                onPress={() => router.push(item.route)} // Use router.push to navigate
              >
                <Text style={styles.menuitemtext}>{item.name}</Text>
                <Ionicons name="chevron-forward" size={20} color="gray" />
              </TouchableOpacity>
            ))}
            {/* {[
              "Favourites",
              "Downloads",
              "Language",
              "Location",
              "Language",
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuitem} onPress={() => router.push(item.route)}>
                <Text style={styles.menuitemtext}>{item}</Text>
                <Ionicons name="chevron-forward" size={20} color="gray" />
              </TouchableOpacity>
            ))} */}

            {/* Logout */}
            <TouchableOpacity className="flex-row items-center py-3">
              <Text className="text-red-500 text-lg flex-1">Log out</Text>
              <Ionicons name="log-out-outline" size={20} color="red" />
            </TouchableOpacity>
            <SignOutButton color="red" />
            <ShareButton />
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
    fontSize: 30,
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
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  edittext: {
    color: "white",
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "red",
    alignSelf: "baseline",
    borderRadius: 50,
  },
  profileDetails: {
    marginLeft: 20,
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
    color: colors.PRIMARY,
    fontSize: 16,
    marginLeft: 10,
  },
});
