import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
// import { auth, db, storage } from "../../firebaseConfig";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
// import { createUserWithEmailAndPassword } from "firebase/auth";

const ProfileSetup = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  // Handle Image Selection
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Handle Form Submission
  const handleSubmit = async () => {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      let imageUrl = null;
      if (image) {
        // Upload image to Firebase Storage
        const response = await fetch(image);
        const blob = await response.blob();
        const storageRef = ref(storage, `profile_pictures/${userId}`);
        await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Save user profile in Firestore
      await setDoc(doc(db, "users", userId), {
        fullName,
        username,
        email,
        phone,
        bio,
        profileImage: imageUrl,
        createdAt: new Date(),
      });

      alert("Profile setup complete!");
    } catch (error) {
      console.error("Error saving profile: ", error.message);
      alert(error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Profile Setup</Text>
      <TouchableOpacity onPress={pickImage}>
        {image ? <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50 }} /> : 
        <Text>Select Profile Picture</Text>}
      </TouchableOpacity>
      <TextInput placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput placeholder="Bio" value={bio} onChangeText={setBio} multiline />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Submit" onPress={handleSubmit} />
      <TouchableOpacity onPress={() => router.replace("/LoginScreen")}>
        <Text>signIn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileSetup;
