# PRITECH React Native Technical Task

A simple React Native task manager built with Expo and JavaScript for the PRITECH technical task.

## What is implemented

- Task list screen
- Add new task with title and description
- Basic validation for required task title, minimum title length, and description length
- Mark task as completed or not completed
- Delete task from both the list screen and details screen, with a confirmation prompt
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

Start the app in Expo Go mode:

```bash
npm start
```

Then open the app with Expo Go on a mobile device, Android emulator, or iOS simulator. The `npm start` script intentionally uses `expo start --go` so Expo does not try to launch a development build unless you explicitly run `npm run start:dev-client`.

### Open on iOS or Android with Expo Go

1. Install **Expo Go** from the App Store on iOS or from Google Play on Android.
2. Make sure the mobile device and development computer are connected to the same Wi-Fi network.
3. Check that the Expo Go app on the phone is compatible with the Expo SDK used by this project and the Expo tooling on the laptop. If the phone has a much newer or older Expo Go version than the project supports, QR scanning can fail.
4. Run `npm start` in this project.
5. When the Expo terminal/Metro page shows a QR code, scan it with the iOS Camera app or with the Expo Go scanner on Android.
6. Tap the Expo Go notification/link to launch the app on the device.

If the QR code does not connect because of a network restriction, run `npm run start:tunnel` and scan the new QR code, or press `s` in the Expo terminal to switch connection modes.

### Troubleshooting Expo Go QR errors

- If you see `Unable to get the default URI scheme for the project`, make sure you are using `npm start`, not `npx expo start --dev-client`. Development builds require `expo-dev-client`; Expo Go does not. This project also defines the app scheme as `pritechtasks` in `app.json` so Expo has a default scheme when one is needed.
- If Expo Go says an error occurred immediately after scanning the QR code, check the Expo SDK version shown in the terminal and make sure the Expo Go app on the phone supports that same SDK version. This project currently uses Expo SDK 51. Current Expo Go versions usually support the latest SDK, so a newer App Store or Google Play version of Expo Go can reject older SDK projects. In that case, either upgrade the project with `npx expo install expo@latest && npx expo install --fix`, or run a development build with `npx expo install expo-dev-client` followed by an EAS/local development build.
- If the app loads but changes do not appear, stop Metro, restart it with `npm start`, and reload the app in Expo Go.
- If the device cannot reach the development server, confirm both devices are on the same network, disable VPN/firewall rules temporarily, or use `npm run start:tunnel`.

## Useful scripts

```bash
npm run android
npm run ios
npm run start:tunnel
npm run start:dev-client
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

## Bonus checklist

- Local persistence: implemented with AsyncStorage.
- API integration: implemented with JSONPlaceholder task suggestions.
- Search and filtering: implemented on the task list.
- Detail screen: implemented with local React state.
- Loading and error states: implemented for app startup and API suggestion fetching.
- Reusable components: form, list item, filters, summary, and empty state are split into separate components.

## Notes

The app keeps navigation simple by switching between the task list and detail view with React state. This avoids unnecessary complexity while still satisfying the required task list and details screens.

## Implementation details

- The app is written in JavaScript using React Native functional components and hooks.
- Tasks are persisted locally with AsyncStorage so they remain after restarting the app.
- JSONPlaceholder is used as the public API source. The API suggestion can be refreshed and added as a normal local task.
- The details screen is implemented with local state-based navigation to keep the solution simple for the task scope.

## Screenshots / recording

Before submitting, add screenshots or a short screen recording that shows adding, completing, deleting, filtering, searching, details, persistence after reload, and the API suggestion flow.
