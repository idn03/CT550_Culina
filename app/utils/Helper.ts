import {ID} from "react-native-appwrite";
import * as ImagePicker from "expo-image-picker";
import { dbConfig, storage } from '@services/appwrite';
import { Platform } from "react-native";
import { getCurrentUser } from '@services/api/auth';

const day = new Date().getDate();
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();

export const isEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const getCurrentDate = (): string => {
    return day + ' / ' + month + ' / ' + year;
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN').replace(/\//g, ' / '); 
};

export const uploadImage = async (): Promise<{ id: string; url: string } | null> => {
    try {
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (pickerResult.canceled) {
            console.log("User cancelled image picker.");
            return null;
        }

        return await uploadImageAsync(pickerResult.assets[0]);
    } catch (error) {
        console.error("Error picking image:", error);
        return null;
    }
};

export const prepareNativeFile = async (asset: ImagePicker.ImagePickerAsset): Promise<{ 
    name: string; 
    type: string; 
    size: number; 
    uri: string 
}> => {
    console.log("[prepareNativeFile] asset: ", asset);
    try {
        const url = new URL(asset.uri);

        return {
            name: url.pathname.split("/").pop()!,
            size: asset.fileSize!,
            type: asset.mimeType!,
            uri: url.href,
        } as any;
    } catch (error) {
        console.error("[prepareNativeFile] error: ", error);
        return Promise.reject(error);
    }
};

export async function uploadImageAsync(asset: ImagePicker.ImagePickerAsset) {
    try {
        const response = await storage.createFile(
            dbConfig.storageId!,
            ID.unique(),
            Platform.OS === "web" ? { ...asset.file!, uri: asset.uri } : await prepareNativeFile(asset)
        );
        console.log("[file uploaded]: ", response);

        const fileUrl = storage.getFileView(
            dbConfig.storageId!,
            response.$id
        ).toString();

        return {id: response.$id, url: fileUrl};
    } catch (error) {
        console.error("[uploadImageAsync] error: ", error);
        return Promise.reject(error);
    }
}

export const previewFile = (fileId: string): string => {
    try {
        const previewUrl = storage.getFileView(
            dbConfig.storageId!,
            fileId
        ).toString();
        
        return previewUrl;
    } catch (error) {
        console.error("[previewFile] error: ", error);
        return '';
    }
}

export const isAuthor = async (accountId: string) => {
    const currentUser = await getCurrentUser();

    if (currentUser?.$id === accountId) return true;
    return false;
}