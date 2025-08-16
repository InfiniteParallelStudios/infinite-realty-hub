import '@testing-library/jest-native/extend-expect';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock expo modules
jest.mock('expo-font');
jest.mock('expo-asset');
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      extra: {},
    },
  },
}));

// Silence the warning about deprecated AsyncStorage
jest.mock('react-native/Libraries/LogBox/LogBox');

// Global test timeout
jest.setTimeout(10000);
