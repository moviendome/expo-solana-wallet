import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = {
  async getItem(key) {
    return JSON.parse(await AsyncStorage.getItem(key));
  },
  async setItem(key, data) {
    AsyncStorage.setItem(key, JSON.stringify(data));
  },
  async removeItem(key) {
    AsyncStorage.removeItem(key);
  },
};

export default storage;
