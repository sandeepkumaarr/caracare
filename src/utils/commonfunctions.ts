import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLastItem = (thePath: string) =>
  thePath.substring(thePath.lastIndexOf('/') + 1);

export const getLocalKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (error) {
    console.log(error);
  }
};
