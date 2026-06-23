import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { formatDate } from "../utils/formatDate";

export default function TaskItem({ task, onPress, onToggle, onDelete }) {
  function handleTogglePress(event) {
    event.stopPropagation();
    onToggle();
  }

  function handleDeletePress(event) {
    event.stopPropagation();
    onDelete();
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.checkbox, task.completed && styles.checkedBox]}
          onPress={handleTogglePress}
        >
          <Text style={styles.checkText}>{task.completed ? "✓" : ""}</Text>
        </TouchableOpacity>

        <View style={styles.textWrap}>
          <Text
            style={[styles.title, task.completed && styles.completedTitle]}
            numberOfLines={1}
          >
            {task.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {task.description || "No description added."}
          </Text>
          <Text style={styles.date}>Created {formatDate(task.createdAt)}</Text>
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#e1e7f0",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 14,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  checkbox: {
    alignItems: "center",
    borderColor: "#b9c4d4",
    borderRadius: 6,
    borderWidth: 2,
    height: 26,
    justifyContent: "center",
    width: 26,
  },
  checkedBox: {
    backgroundColor: "#2e7d32",
    borderColor: "#2e7d32",
  },
  checkText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
    lineHeight: 18,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: "#16213E",
    fontSize: 16,
    fontWeight: "800",
  },
  completedTitle: {
    color: "#7d8899",
    textDecorationLine: "line-through",
  },
  description: {
    color: "#5e6b7f",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  date: {
    color: "#8a94a6",
    fontSize: 12,
    marginTop: 6,
  },
  deleteButton: {
    backgroundColor: "#fff1f1",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  deleteText: {
    color: "#d92d20",
    fontSize: 12,
    fontWeight: "800",
  },
});
