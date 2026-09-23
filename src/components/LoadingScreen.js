import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

export default function LoadingScreen({ label = "Loading..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0B63C5" />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  label: { marginTop: 12, color: "#4B5563", fontSize: 14 },
});
