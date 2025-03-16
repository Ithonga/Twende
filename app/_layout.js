// import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
// import { Stack } from "expo-router";
// import * as SecureStore from "expo-secure-store";

// // Secure Store for Clerk token caching
// const tokenCache = {
//     async getToken(key) {
//         return SecureStore.getItemAsync(key);
//     },
//     async saveToken(key, value) {
//         return SecureStore.setItemAsync(key, value);
//     },
// };

// export default function RootLayout() {
//     return (
//         <ClerkProvider
//             tokenCache={tokenCache}
//             publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
//         >
//             <SignedIn>
//                 {/* If signed in, show main app screens */}
//                 <Stack screenOptions={{ headerShown: false }}>
//                     <Stack.Screen name="index" options={{ headerShown: false }} />
//                 </Stack>
//             </SignedIn>

//             <SignedOut>
//                 {/* If signed out, show auth screens */}
//                 <Stack screenOptions={{ headerShown: false }}>
//                     <Stack.Screen name="sign-in" options={{ headerShown: false }} />
//                     <Stack.Screen name="sign-up" options={{ headerShown: false }} />
//                 </Stack>
//             </SignedOut>
//         </ClerkProvider>
//     );
// }

import { ClerkProvider } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import { Slot, Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

export default function RootLayout() {
  const tokenCache = {
    async getToken(key) {
      return SecureStore.getItemAsync(key);
    },
    async saveToken(key, value) {
      return SecureStore.setItemAsync(key, value);
    },
  };

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <AuthWrapper />
    </ClerkProvider>
  );
}

function AuthWrapper() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn === false) {
      router.replace("/(auth)/sign-in");
    } else if (isSignedIn === true) {
      router.replace("/home");
    }
  }, [isSignedIn]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="edit-profile" options={{ presentation: "modal" }} />
        <Stack.Screen name="settings" options={{ presentation: "modal" }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  ); // Ensures the index.js (splash screen) is rendered first
}
