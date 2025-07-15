# Favorite Users App

A modern React Native mobile application that allows users to browse, favorite, and manage a list of users. Built with Expo, TypeScript, and modern React Native tools and libraries.

## Features

### Core Features
- ✓ Browse all users with name, email, and favorite functionality
- ✓ Dedicated favorites screen with swipe-to-unfavorite
- ✓ Detailed user profile view with address, phone, and company info
- ✓ Global state management using Zustand
- ✓ Data persistence with AsyncStorage
- ✓ Real-time search and filtering
- ✓ Alphabetical sorting by name/email
- ✓ Pull-to-refresh functionality

### Enhanced UI/UX
- ✓ Loading shimmer/skeleton states
- ✓ Toast notifications for user actions
- ✓ Smooth animations and transitions
- ✓ Offline mode support with cached favorites
- ✓ Dark/Light theme toggle
- ✓ Responsive layouts and proper SafeAreaView implementation

### Bonus Features
- ✓ Infinite scroll pagination
- ✓ Badge system with filtering
- ✓ Type-safe navigation with TypeScript
- ✓ Unit tests for Zustand store (5 passing tests)
- ✓ DiceBear API integration for user avatars

## Tech Stack

- **Framework:** React Native (Expo)
- **Language:** TypeScript
- **State Management:** Zustand
- **Navigation:** React Navigation (Stack & Tab)
- **Storage:** AsyncStorage
- **Styling:** NativeWind (Tailwind CSS)
- **UI Enhancements:** 
  - Moti (Animations)
  - React Native Reanimated
  - React Native Toast Message

## Screens

1. **All Users Screen**
   - User list with search and sort
   - Badge filtering
   - Favorite toggle
   - Pull-to-refresh
   - Infinite scroll

2. **Favorites Screen**
   - Filtered favorite users
   - Swipe-to-unfavorite
   - Badge filtering
   - Persistent storage

3. **User Detail Screen**
   - Comprehensive user information
   - Animated header card
   - Dark mode support
   - Avatar display

4. **Settings Screen**
   - Theme toggle
   - App information
   - User preferences

## Project Structure

```
src/
├── app/                 # Expo Router pages
│   ├── _layout.tsx     # Root layout (Tab navigation)
│   ├── index.tsx       # All Users Screen
│   ├── favorites.tsx   # Favorites Screen
│   ├── settings.tsx    # Settings Screen
│   └── [id].tsx        # User Detail Screen
├── components/         # Reusable UI components
├── store/             # Zustand state management
├── services/          # API integration
├── utils/             # Helper functions
├── constants/         # Theme and config
└── types/             # TypeScript definitions
```

## Implementation Details

- Proper error handling and loading states
- Optimized performance with proper React hooks usage
- Type-safe implementation throughout
- Consistent styling and theming
- Comprehensive test coverage for store
- Proper iOS and Android platform-specific handling