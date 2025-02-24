import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function EditProfileScreen() {
  return (
    <View className="flex-1 bg-white p-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Link href="/profile" asChild>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </Link>
        <Text className="text-xl font-semibold">Edit Profile</Text>
        <Ionicons name="checkmark" size={24} color="green" />
      </View>

      {/* Profile Picture */}
      <View className="items-center mb-6">
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          className="w-24 h-24 rounded-full"
        />
        <TouchableOpacity className="absolute bottom-0 right-12 bg-gray-200 p-2 rounded-full">
          <Ionicons name="camera" size={18} color="black" />
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      {[
        { label: 'Name', value: 'Charlotte King' },
        { label: 'E-mail Address', value: 'johnkinggraphics@gmail.com' },
        { label: 'User Name', value: '@johnkinggraphics' },
        { label: 'Password', value: '********', isPassword: true },
        { label: 'Phone Number', value: '+91 6895312' },
      ].map((item, index) => (
        <View key={index} className="mb-4">
          <Text className="text-gray-600">{item.label}</Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg p-3">
            <TextInput
              value={item.value}
              secureTextEntry={item.isPassword}
              className="flex-1 text-gray-800"
              editable={!item.isPassword}
            />
            {item.isPassword && (
              <Ionicons name="eye-outline" size={20} color="gray" />
            )}
          </View>
        </View>
      ))}
    </View>
  );
}
