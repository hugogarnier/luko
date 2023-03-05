import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStorageItem = async (key: string, value: string) => {
  try {
    // const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // save error
  }
};

export const getAsyncStorageItem = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
  }
};

export const removeAsyncStorageItem = async () => {
  try {
    await AsyncStorage.removeItem('data');
  } catch (e) {
    // remove error
  }
};
