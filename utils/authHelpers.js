import { useOAuth, setActive } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleSignIn = () => {
  const router = useRouter();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId } = await startOAuthFlow();

      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        router.replace("/home");
      } else {
        Alert.alert("Sign-In Failed", "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      Alert.alert("Error", "Could not sign in with Google. Please try again.");
    }
  };

  return handleGoogleSignIn;
};
