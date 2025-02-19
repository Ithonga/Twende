// app/home.js
import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import MyButton from '../components/MyButton'; // Your custom button component

const HomeScreen = () => {
  const { isLoaded, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signOut();
      Alert.alert('Signed Out', 'You have been successfully signed out.');
      router.replace('/sign-in'); // Redirect to the login page
    } catch (err) {
      Alert.alert('Error', 'Failed to sign out. Please try again.');
      console.error('Sign-out error:', err);
    }
  };

  return (
    <View style={{  justifyContent: 'center', alignItems: 'center' }}>
      <MyButton onPress={handleSignOut} title="Sign Out" color="red" disabled={undefined} />
    </View>
  );
};

export default HomeScreen;