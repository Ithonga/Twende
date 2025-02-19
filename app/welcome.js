import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the App!</Text>
      <Button title="Next" onPress={() => router.push("/onboarding")} />
    </View>
  );
}
