import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Operation = "+" | "−" | "×" | "÷";

export default function HomeScreen() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = (operation: Operation) => {
    if (
      firstNumber.trim() === "" ||
      secondNumber.trim() === ""
    ) {
      setResult(null);
      setError("Please enter both numbers.");
      return;
    }

    const first = Number(firstNumber);
    const second = Number(secondNumber);

    if (!Number.isFinite(first) || !Number.isFinite(second)) {
      setResult(null);
      setError("Please enter valid numbers.");
      return;
    }

    if (operation === "÷" && second === 0) {
      setResult(null);
      setError("Cannot divide by zero.");
      return;
    }

    let answer = 0;

    if (operation === "+") {
      answer = first + second;
    } else if (operation === "−") {
      answer = first - second;
    } else if (operation === "×") {
      answer = first * second;
    } else if (operation === "÷") {
      answer = first / second;
    }

    setError(null);
    setResult(String(answer));
  };

  const clearCalculator = () => {
    setFirstNumber("");
    setSecondNumber("");
    setResult(null);
    setError(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Title */}
        <Text style={styles.title}>Calculator</Text>

        {/* Display */}
        <View style={styles.display}>
          <Text style={styles.displayLabel}>
            {error ? "ERROR" : "RESULT"}
          </Text>

          <Text
            style={[
              styles.displayValue,
              error && styles.errorText,
            ]}
          >
            {error ?? result ?? "0"}
          </Text>
        </View>

        {/* Inputs */}
        <View style={styles.inputs}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>NUMBER 1</Text>

            <TextInput
              style={styles.input}
              value={firstNumber}
              onChangeText={setFirstNumber}
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor="#666666"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>NUMBER 2</Text>

            <TextInput
              style={styles.input}
              value={secondNumber}
              onChangeText={setSecondNumber}
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor="#666666"
            />
          </View>
        </View>

        {/* Operation Buttons */}
        <View style={styles.operations}>
          <Pressable
            onPress={() => calculate("+")}
            style={({ pressed }) => [
              styles.operationButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.operationText}>+</Text>
          </Pressable>

          <Pressable
            onPress={() => calculate("−")}
            style={({ pressed }) => [
              styles.operationButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.operationText}>−</Text>
          </Pressable>

          <Pressable
            onPress={() => calculate("×")}
            style={({ pressed }) => [
              styles.operationButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.operationText}>×</Text>
          </Pressable>

          <Pressable
            onPress={() => calculate("÷")}
            style={({ pressed }) => [
              styles.operationButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.operationText}>÷</Text>
          </Pressable>
        </View>

        {/* Clear */}
        <Pressable
          onPress={clearCalculator}
          style={({ pressed }) => [
            styles.clearButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.clearText}>CLEAR</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },

  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 30,
  },

  /* Display */

  display: {
    minHeight: 130,
    backgroundColor: "#171717",
    borderRadius: 20,
    padding: 22,
    justifyContent: "space-between",
    marginBottom: 30,
  },

  displayLabel: {
    color: "#888888",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  displayValue: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "700",
    textAlign: "right",
    marginTop: 15,
  },

  errorText: {
    color: "#FF7777",
    fontSize: 18,
  },

  /* Inputs */

  inputs: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },

  inputContainer: {
    flex: 1,
  },

  inputLabel: {
    color: "#888888",
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 8,
  },

  input: {
    color: "#FFFFFF",
    fontSize: 22,
    backgroundColor: "#171717",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
  },

  /* Operations */

  operations: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },

  operationButton: {
    flex: 1,
    height: 65,
    backgroundColor: "#2A2A2A",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  operationText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "600",
  },

  /* Clear */

  clearButton: {
    height: 55,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  clearText: {
    color: "#000000",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1,
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});
