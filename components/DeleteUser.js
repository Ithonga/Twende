import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useUser, useAuth } from "@clerk/clerk-expo";

export default function DeleteAccountButton() {
  const { user } = useUser(); // Get user object
  const { signOut } = useAuth(); // Get signOut function

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "😭Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await user.delete(); // Delete the user account
              await signOut(); // Log out after account deletion
              Alert.alert("Account Deleted", "Your account has been successfully deleted.");
            } catch (error) {
              Alert.alert("Error", "Failed to delete account. Please try again.");
              console.error("Delete Account Error:", error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 8,
  },
  deleteText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
