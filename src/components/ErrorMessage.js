import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#FEE2E2",
    borderColor: "#FCA5A5",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  text: { color: "#B91C1C", fontSize: 13 },
});
