// Mock Expo's import registry
global.__ExpoImportMetaRegistry = {
  getValue: jest.fn(),
};

// Mock Expo's winter runtime
jest.mock('expo/src/winter/runtime.native', () => ({
  __esModule: true,
  default: {
    registerRootComponent: jest.fn(),
  },
}));

// Mock Expo module
jest.mock('expo', () => ({
  __esModule: true,
  default: {
    registerRootComponent: jest.fn(),
  },
}));

// Mock Expo Router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  Link: 'Link',
}));

// Mock NativeWind
jest.mock('nativewind', () => ({
  useColorScheme: () => ({
    colorScheme: 'light',
    toggleColorScheme: jest.fn(),
  }),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  mergeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
  flushGetRequests: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
  multiMerge: jest.fn(),
}));

// Mock React Native's Platform
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn((obj) => obj.ios),
})); 