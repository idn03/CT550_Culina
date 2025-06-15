import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
    REMEMBER_ME: 'REMEMBER_ME',
    accountId: 'accountId',
    isNewbie: true,
};

export const storeData = async (key: string, value: string) => {
    try {
        console.log('Storing data:', key, value);
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error('Error storing data:', error);
    }
};

export const getData = async (key: string) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        console.error('Error getting data:', error);
        return null;
    }
};

export const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing data:', error);
    }
};

export const clearAll = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error('Error clearing storage:', error);
        throw error;
    }
};

export const getAllKeys = async () => {
    try {
        return await AsyncStorage.getAllKeys();
    } catch (error) {
        console.error('Error getting all keys:', error);
        throw error;
    }
};