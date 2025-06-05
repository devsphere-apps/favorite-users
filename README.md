# 🧪 React Native Mid-Level Challenge – User Favorites App

Welcome to the React Native Coding Challenge!

This test assesses your ability to work with modern tools and libraries, apply best practices, and deliver production-quality code in a mobile environment.

---

## 📱 Project Overview

Your task is to build a simple but functional **User Favorites App** using **React Native (Expo)** and modern tooling. The app should fetch a list of users and allow the user to **favorite/unfavorite** them. You’ll also implement extra real-world features like persistent state, search/filtering, and offline awareness.

---

## 🛠️ Tools & Technologies

You are required to use the following:

- ✅ [React Native (Expo)](https://expo.dev/)
- ✅ [Zustand](https://github.com/pmndrs/zustand) for global state
- ✅ TypeScript
- ✅ [React Navigation](https://reactnavigation.org/) for screen routing
- ✅ AsyncStorage for persistence
- ✅ Axios or Fetch API for data fetching
- ✅ Tailwind CSS (NativeWind) or a component library of your choice (Optional)
- ✅ Any UI enhancements are a plus (Moti, Shimmer, Toasts, etc.)

---

## 📦 Requirements

### 🔹 Screens

1. **All Users**

   - Fetch and list users from [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)
   - Display name, email, and a “Favorite” icon
   - Allow toggling users as favorite

2. **Favorite Users**

   - Show only the users marked as favorite
   - Swipe to unfavorite or use a toggle

3. **User Detail Screen**

   - Clicking a user shows more info (address, phone, company) via a modal or full screen

4. **Navigation**

   - Implement **Tab Navigation** between “All Users” and “Favorites”
   - Use **Stack/Modal Navigation** for detail screen

5. **Personal Touch**
   - Implementing some personal touch-ups are important. If those are liked by the interviewer it can be the plus.”

---

## ✨ Additional Features to Implement

- 🔄 Pull to refresh on the user list
- 🔍 Real-time search bar to filter users by name
- 🔽 Sort users alphabetically by name or email
- ❤️ Zustand-powered global store
- 💾 Persist favorites using AsyncStorage
- 🍞 Show toast on favoriting/unfavoriting (e.g., using `react-native-toast-message`)
- 🔄 Show a loading shimmer/skeleton while fetching users
- 📶 Show offline banner and allow using cached favorites
- 🌙 Add light/dark theme toggle using `NativeWind` or `react-native-paper`

---

## 🔧 Folder Structure (Suggested)

```text
src/
├── components/       # Reusable UI components
├── navigation/       # React Navigation setup
├── screens/          # All screen components
├── store/            # Zustand state management
├── constants/        # App-wide constants (e.g. colors, strings)
├── services/         # API service calls
├── types/            # TypeScript type definitions
└── utils/            # Utility/helper functions

App.tsx              # Entry point


Note: Candidate should have good knowledge on expo router as well.
```

## 🚀 Getting Started

### Prerequisites

- **Node.js ≥ 22**
- **Expo CLI installed globally**

```bash
npm install -g expo-cli
```

## 📊 Bonus (Optional)

- 🚀 Implement **pagination (infinite scroll)** for the user list
- 🎖️ Assign random **badges** to users (e.g., `"Pro"`, `"New"`) and **filter by badge**
- 🛡️ Use proper **TypeScript types** for navigation routes (typed stack/tab params)
- 🧪 Write **unit tests** for the Zustand store using your preferred testing library

## 📝 Submission Guidelines

1. 🍴 **Fork** this repository
2. ✅ **Complete** the challenge following all listed requirements
3. 🚀 **Push** your code to your forked GitHub repository
4. 🔗 **Submit** the link to your forked repository for review

## ✅ Evaluation Criteria

- 🔸 Code readability, structure, and maintainability
- 🔸 Correct and effective use of Zustand, React Navigation, and async data handling
- 🔸 UX quality and completeness of all required and additional features
- 🔸 Proper TypeScript usage and typing consistency
- 🔸 Implementation of bonus features and extra polish

## 🙌 Good Luck!

If you have any questions or issues, feel free to reach out.  
We look forward to seeing your solution!

Happy Coding! 🚀
