import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import colors from '../colors/colors';

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
    width: '100%',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default MyButton;