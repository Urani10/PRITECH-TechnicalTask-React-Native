# PRITECH React Native Technical Task

A simple React Native task manager built with Expo and JavaScript for the PRITECH technical task.

## What is implemented

- Task list screen
- Add new task with title and description
- Basic validation for required task title
- Mark task as completed or not completed
- Delete task
- Simple task details view
- Search tasks by title
- Filter tasks by status
- Local task storage using AsyncStorage
- Public API integration using JSONPlaceholder task data
- Clean reusable components with functional components and hooks

## Tech stack

- React Native
- Expo
- JavaScript
- AsyncStorage

## Setup

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm start
```

Then open the app with Expo Go on a mobile device, Android emulator, or iOS simulator.

## Useful scripts

```bash
npm run android
npm run ios
```

## Project structure

```text
App.js
src/
  components/
    EmptyState.js
    FilterTabs.js
    TaskForm.js
    TaskItem.js
  storage/
    tasksStorage.js
  utils/
    formatDate.js
```

## Notes

The app keeps navigation simple by switching between the task list and detail view with React state. This avoids unnecessary complexity while still satisfying the required task list and details screens.
