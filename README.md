# PRITECH React Native Technical Task

A simple React Native task manager built with Expo and JavaScript for the PRITECH technical task.

## What is implemented

- Task list screen
- Add new task with title and description
- Basic validation for required task title, minimum title length, and description length
- Mark task as completed or not completed
- Delete task
- Simple task details view
- Search tasks by title
- Filter tasks by status
- Local task storage using AsyncStorage
- Public API integration using random JSONPlaceholder task suggestions
- Refreshable API suggestion card with loading and error states
- Task summary showing total, open, and completed counts
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
    TaskSummary.js
  storage/
    tasksStorage.js
  utils/
    formatDate.js
```

## Notes

The app keeps navigation simple by switching between the task list and detail view with React state. This avoids unnecessary complexity while still satisfying the required task list and details screens.

## Implementation details

- The app is written in JavaScript using React Native functional components and hooks.
- Tasks are persisted locally with AsyncStorage so they remain after restarting the app.
- JSONPlaceholder is used as the public API source. The API suggestion can be refreshed and added as a normal local task.
- The details screen is implemented with local state-based navigation to keep the solution simple for the task scope.

## Screenshots / recording

Add screenshots or a short screen recording here before submitting the public repository link.
