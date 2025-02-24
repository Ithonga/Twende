import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet, Textrr } from "react-native";
import colors from "../colors/colors";

const OTPInput = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    if (isNaN(text)) return; // Ensure only numbers are entered
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input box
    if (text && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // When the last box is filled, trigger completion callback
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.otpContainer}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          style={styles.otpBox}
          keyboardType="number-pad"
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: colors.BLUE,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 5,
    borderRadius: 8,
  },
});

export default OTPInput;
