import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FilterTabs({ filters, activeFilter, onChange }) {
  return (
    <View style={styles.tabs}>
      {Object.entries(filters).map(([key, label]) => {
        const isActive = activeFilter === key;

        return (
          <TouchableOpacity
            key={key}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onChange(key)}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: "#e9edf5",
    borderRadius: 8,
    flexDirection: "row",
    gap: 6,
    marginTop: 12,
    padding: 4,
  },
  tab: {
    alignItems: "center",
    borderRadius: 7,
    flex: 1,
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: "#ffffff",
  },
  tabText: {
    color: "#5e6b7f",
    fontWeight: "800",
  },
  activeTabText: {
    color: "#2155CD",
  },
});
