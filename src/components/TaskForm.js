import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    onSubmit({ title, description });
    setTitle("");
    setDescription("");
    setError("");
  }

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Add new task</Text>

      <TextInput
        style={styles.input}
        placeholder="Task title"
        placeholderTextColor="#8a94a6"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        multiline
        style={[styles.input, styles.descriptionInput]}
        placeholder="Short description"
        placeholderTextColor="#8a94a6"
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#e1e7f0",
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  cardTitle: {
    color: "#16213E",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#f9fbfe",
    borderColor: "#dce2ec",
    borderRadius: 8,
    borderWidth: 1,
    color: "#16213E",
    fontSize: 15,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  descriptionInput: {
    minHeight: 86,
  },
  errorText: {
    color: "#d92d20",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 12,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2155CD",
    borderRadius: 8,
    paddingVertical: 14,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
});
