import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import EmptyState from "./src/components/EmptyState";
import FilterTabs from "./src/components/FilterTabs";
import TaskForm from "./src/components/TaskForm";
import TaskItem from "./src/components/TaskItem";
import { formatDate } from "./src/utils/formatDate";
import { loadTasks, saveTasks } from "./src/storage/tasksStorage";

const FILTERS = {
  all: "All",
  open: "Open",
  completed: "Done",
};

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [apiTask, setApiTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingApiTask, setIsFetchingApiTask] = useState(false);

  useEffect(() => {
    async function prepareTasks() {
      const storedTasks = await loadTasks();
      setTasks(storedTasks);
      setIsLoading(false);
    }

    prepareTasks();
    fetchApiTask();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveTasks(tasks);
    }
  }, [tasks, isLoading]);

  const visibleTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (activeFilter === "completed") {
          return task.completed;
        }

        if (activeFilter === "open") {
          return !task.completed;
        }

        return true;
      })
      .filter((task) =>
        task.title.toLowerCase().includes(searchText.trim().toLowerCase())
      );
  }, [activeFilter, searchText, tasks]);

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

  async function fetchApiTask() {
    try {
      setIsFetchingApiTask(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      const data = await response.json();
      setApiTask({
        title: data.title,
        description: "Suggested from JSONPlaceholder public API.",
      });
    } catch (error) {
      setApiTask(null);
    } finally {
      setIsFetchingApiTask(false);
    }
  }

  function handleAddTask(taskData) {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }

  function handleAddApiTask() {
    if (!apiTask) {
      return;
    }

    handleAddTask(apiTask);
    setApiTask(null);
  }

  function handleToggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleDeleteTask(taskId) {
    Alert.alert("Delete task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setTasks((currentTasks) =>
            currentTasks.filter((task) => task.id !== taskId)
          );
          if (selectedTaskId === taskId) {
            setSelectedTaskId(null);
          }
        },
      },
    ]);
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" />
        <ActivityIndicator color="#2155CD" size="large" />
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </SafeAreaView>
    );
  }

  if (selectedTask) {
    return (
      <SafeAreaView style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.detailContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedTaskId(null)}
          >
            <Text style={styles.backButtonText}>Back to tasks</Text>
          </TouchableOpacity>

          <View style={styles.detailCard}>
            <Text style={styles.detailStatus}>
              {selectedTask.completed ? "Completed" : "Not completed"}
            </Text>
            <Text style={styles.detailTitle}>{selectedTask.title}</Text>
            <Text style={styles.detailDescription}>
              {selectedTask.description || "No description added."}
            </Text>
            <Text style={styles.detailDate}>
              Created {formatDate(selectedTask.createdAt)}
            </Text>
          </View>

          <View style={styles.detailActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.primaryAction]}
              onPress={() => handleToggleTask(selectedTask.id)}
            >
              <Text style={styles.primaryActionText}>
                {selectedTask.completed ? "Mark as open" : "Mark as done"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.deleteAction]}
              onPress={() => handleDeleteTask(selectedTask.id)}
            >
              <Text style={styles.deleteActionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>PRITECH Technical Task</Text>
          <Text style={styles.title}>Personal Tasks</Text>
          <Text style={styles.subtitle}>
            Add tasks, track progress, and keep the list stored locally.
          </Text>
        </View>

        <TaskForm onSubmit={handleAddTask} />

        <View style={styles.apiCard}>
          <View style={styles.apiTextWrap}>
            <Text style={styles.sectionTitle}>API suggestion</Text>
            {isFetchingApiTask ? (
              <Text style={styles.mutedText}>Fetching a public task...</Text>
            ) : (
              <Text style={styles.apiTitle}>
                {apiTask ? apiTask.title : "No suggestion available."}
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={[styles.smallButton, !apiTask && styles.disabledButton]}
            onPress={handleAddApiTask}
            disabled={!apiTask}
          >
            <Text style={styles.smallButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.toolbar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by title"
            placeholderTextColor="#8a94a6"
            value={searchText}
            onChangeText={setSearchText}
          />
          <FilterTabs
            filters={FILTERS}
            activeFilter={activeFilter}
            onChange={setActiveFilter}
          />
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          <Text style={styles.counterText}>
            {visibleTasks.length} of {tasks.length}
          </Text>
        </View>

        {visibleTasks.length === 0 ? (
          <EmptyState hasTasks={tasks.length > 0} />
        ) : (
          visibleTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onPress={() => setSelectedTaskId(task.id)}
              onToggle={() => handleToggleTask(task.id)}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f7f8fb",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    alignItems: "center",
    backgroundColor: "#f7f8fb",
    flex: 1,
    justifyContent: "center",
  },
  loadingText: {
    color: "#5e6b7f",
    marginTop: 12,
  },
  header: {
    marginBottom: 20,
  },
  eyebrow: {
    color: "#2155CD",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    color: "#16213E",
    fontSize: 32,
    fontWeight: "800",
  },
  subtitle: {
    color: "#5e6b7f",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  apiCard: {
    alignItems: "center",
    backgroundColor: "#eaf2ff",
    borderColor: "#cdddf8",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    padding: 14,
  },
  apiTextWrap: {
    flex: 1,
  },
  apiTitle: {
    color: "#364154",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
    textTransform: "capitalize",
  },
  sectionTitle: {
    color: "#16213E",
    fontSize: 17,
    fontWeight: "800",
  },
  mutedText: {
    color: "#6d788c",
    fontSize: 14,
    marginTop: 6,
  },
  smallButton: {
    backgroundColor: "#2155CD",
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  smallButtonText: {
    color: "#ffffff",
    fontWeight: "800",
  },
  disabledButton: {
    opacity: 0.45,
  },
  toolbar: {
    marginTop: 22,
  },
  searchInput: {
    backgroundColor: "#ffffff",
    borderColor: "#dce2ec",
    borderRadius: 8,
    borderWidth: 1,
    color: "#16213E",
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  listHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 22,
  },
  counterText: {
    color: "#6d788c",
    fontWeight: "700",
  },
  detailContent: {
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 18,
    paddingVertical: 8,
  },
  backButtonText: {
    color: "#2155CD",
    fontSize: 15,
    fontWeight: "800",
  },
  detailCard: {
    backgroundColor: "#ffffff",
    borderColor: "#e1e7f0",
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  detailStatus: {
    color: "#2155CD",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  detailTitle: {
    color: "#16213E",
    fontSize: 26,
    fontWeight: "800",
    lineHeight: 32,
  },
  detailDescription: {
    color: "#4f5d73",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },
  detailDate: {
    color: "#7d8899",
    fontSize: 13,
    marginTop: 18,
  },
  detailActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    paddingVertical: 14,
  },
  primaryAction: {
    backgroundColor: "#2155CD",
  },
  primaryActionText: {
    color: "#ffffff",
    fontWeight: "800",
  },
  deleteAction: {
    backgroundColor: "#fff1f1",
    borderColor: "#ffd4d4",
    borderWidth: 1,
  },
  deleteActionText: {
    color: "#d92d20",
    fontWeight: "800",
  },
});
