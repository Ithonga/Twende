import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../colors/colors";
import { ScrollView } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import SignOutButton from "../../components/SignOutButton";
import ShareButton from "../../components/ShareButton";
import { router } from "expo-router";
import UpdatesDemo from "../../components/UpdatesDemo";
import DeleteAccountButton from "../../components/DeleteUser";

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut, isLoaded } = useAuth();

  const menuitems = [
    {
      name: "Favourites",
      route: "/profileScreens/Favourites",
      Ionicons: "heart",
    },
    {
      name: "Downloads",
      route: "/profileScreens/Downloads",
      Ionicons: "download-outline",
    },
    // { name: "Language", route: "/profileScreens/Language" , Ionicons: "language" },
    // { name: "Location", route: "/profileScreens/Location" , Ionicons: "location" },
    { name: "About", route: "/profileScreens/About", Ionicons: "person" },
    {
      name: "Feedback",
      route: "/profileScreens/Feedback",
      Ionicons: "chatbubbles",
    },
  ];

  const handleSignOut = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signOut();
      Alert.alert("Signed Out", "You have been successfully signed out.");
      router.replace("/sign-in"); // Redirect to the login page
    } catch (err) {
      Alert.alert("Error", "Failed to sign out. Please try again.");
      console.error("Sign-out error:", err);
    }
  };

  // Function to get initials from second and last name
  const getInitials = (fullName) => {
    if (!fullName) return "U"; // Default initial if no name
    const nameParts = fullName.trim().split(" ");
    if (nameParts.length < 2) return nameParts[0][0].toUpperCase(); // If only one name, take first letter
    const secondName = nameParts[1][0].toUpperCase();
    const lastName =
      nameParts.length > 2
        ? nameParts[nameParts.length - 1][0].toUpperCase()
        : "";
    return secondName + lastName;
  };

  // Handle case where user is null
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Loading user...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Header */}
        <View style={styles.header}>
          {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
          <Text style={styles.headertext}>My Profile</Text>
          <MaterialIcons
            name="settings-suggest"
            size={30}
            color="black"
            onPress={() => router.push("/settings")}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
        >
          {/* Profile Info */}
          {/* <View style={styles.profileInfo}>
            <Image
              source={
                user?.imageUrl
                  ? { uri: user.imageUrl }
                  : require("../../assets/user.jpg")
              }
              style={styles.profileImage}
            /> */}
          <View style={styles.profileInfo}>
            {user.imageUrl ? (
              <Image
                source={{ uri: user.imageUrl }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.initialsContainer}>
                <Text style={styles.initialsText}>
                  {getInitials(user.fullName)}
                </Text>
              </View>
            )}
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
                <View style={styles.menuitemcontainer}>
                  <Ionicons name={item.Ionicons} size={20} color="black" />
                  <Text style={styles.menuitemtext}>{item.name}</Text>
                  <Ionicons name="chevron-forward" size={20} color="gray" />
                </View>
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
            <TouchableOpacity style={styles.logout} onPress={handleSignOut}>
              <Text style={styles.logouttext}>Log out</Text>
              <Ionicons name="log-out-outline" size={20} color="red" />
            </TouchableOpacity>
            <UpdatesDemo />
            <ShareButton />
            <DeleteAccountButton />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menuitemcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    height: 60,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
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
    // borderBottomWidth: 1,
    // borderBottomColor: colors.GRAY,
  },
  menuitemtext: {
    flex: 1,
    color: colors.PRIMARY,
    fontSize: 16,
    marginLeft: 10,
    // backgroundColor: "red",
    padding: 10,
  },
  logout: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY,
  },
  logouttext: {
    flex: 1,
    color: "red",
    fontSize: 16,
    marginLeft: 10,
  },
  initialsContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc", // Placeholder color
    justifyContent: "center",
    alignItems: "center",
  },
  initialsText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
});
