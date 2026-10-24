import * as SecureStore from 'expo-secure-store';

const API_KEY = 'anthropic_api_key';

export const apiKeyStorage = {
  get: () => SecureStore.getItemAsync(API_KEY),
  set: (value: string) => SecureStore.setItemAsync(API_KEY, value),
  clear: () => SecureStore.deleteItemAsync(API_KEY),
};
