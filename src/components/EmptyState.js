import { StyleSheet, Text, View } from "react-native";

export default function EmptyState({ hasTasks }) {
  return (
    <View style={styles.emptyCard}>
      <Text style={styles.title}>
        {hasTasks ? "No matching tasks" : "No tasks yet"}
      </Text>
      <Text style={styles.text}>
        {hasTasks
          ? "Try a different search or status filter."
          : "Add your first task using the form above."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e1e7f0",
    borderRadius: 8,
    borderWidth: 1,
    padding: 24,
  },
  title: {
    color: "#16213E",
    fontSize: 18,
    fontWeight: "800",
  },
  text: {
    color: "#6d788c",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    textAlign: "center",
  },
});
