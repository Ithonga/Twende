import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const MyButton = ({ onPress, title, color, disabled }) => {
  return (
    <Pressable
      onPress={disabled ? null : onPress} // Disable onPress if the button is disabled
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: disabled ? '#cccccc' : color }, // Change color when disabled
        pressed && !disabled && styles.buttonPressed, // Apply pressed style only if not disabled
      ]}
      disabled={disabled} // Pass the disabled prop to Pressable
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20
  },
  buttonPressed: {
    opacity: 0.7,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default MyButton;