import { ID } from "react-native-appwrite";
import { dbConfig, database, account } from "../appwrite";
import { Alert } from "react-native";
import { getCurrentUser } from './auth';
import { ReportForm } from "@/interfaces/reports";

export const createReport = async (data: ReportForm) => {
    const user = await getCurrentUser();

    if (!user) return;

    try {
        const response = await database.createDocument(
            dbConfig.db,
            dbConfig.collection.reports,
            ID.unique(),
            {
                content: data.content,
                type: data.type,
                accountId: user.$id,
                recipeId: data.recipeId,
            },
        );

        Alert.alert("Recipe created successfully!", "OK");
        console.log("Recipe created successfully:", response);
    }
    catch (error) {
        console.error(error);
    }
}