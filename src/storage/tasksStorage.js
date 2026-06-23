import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_STORAGE_KEY = "pritech_tasks";

export async function loadTasks() {
  try {
    const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    return [];
  }
}

export async function saveTasks(tasks) {
  try {
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    return false;
  }

  return true;
}
