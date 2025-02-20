import { View, Text, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        Alert.alert("Signed Out", "You have been signed out successfully.");
        router.replace("/loginScreen"); // Redirect to login screen
      })
      .catch((error) => Alert.alert("Error", error.message));
  };

  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Pressable
        onPress={handleSignOut}
        style={{
          backgroundColor: "red",
          padding: 10,
          borderRadius: 8,
          alignItems: "center",
          width: 150,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Sign Out</Text>
      </Pressable>
    </View>
  );
}
