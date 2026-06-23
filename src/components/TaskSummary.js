import { StyleSheet, Text, View } from "react-native";

export default function TaskSummary({ totalTasks, completedTasks }) {
  const openTasks = totalTasks - completedTasks;

  return (
    <View style={styles.card}>
      <View style={styles.item}>
        <Text style={styles.value}>{totalTasks}</Text>
        <Text style={styles.label}>Total</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.item}>
        <Text style={styles.value}>{openTasks}</Text>
        <Text style={styles.label}>Open</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.item}>
        <Text style={styles.value}>{completedTasks}</Text>
        <Text style={styles.label}>Done</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e1e7f0",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    marginBottom: 16,
    padding: 16,
  },
  item: {
    alignItems: "center",
    flex: 1,
  },
  value: {
    color: "#16213E",
    fontSize: 22,
    fontWeight: "900",
  },
  label: {
    color: "#6d788c",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4,
  },
  divider: {
    backgroundColor: "#e1e7f0",
    height: 36,
    width: 1,
  },
});
