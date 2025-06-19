import { ID, Permission, Role, Query } from "react-native-appwrite";
import { getCurrentUser } from "./auth";
import { dbConfig, database } from '../appwrite';
import { HistoryRating } from "@/interfaces/history";
import { formatDate } from '@/utils/Helper';

const mapDocumentToHistoryRating = (doc: any): HistoryRating => {
    return {
        $id: doc.$id || '',
        ratedOn: formatDate(doc.$updatedAt) || '',
        score: doc.score || 0,
        author: {
            $id: doc.accountId.$id || '',
            fullname: doc.accountId.fullname || '',
            avatar: doc.accountId.avatar || '',
        },
        recipeData: {
            $id: doc.recipeId.$id || '',
            title: doc.recipeId.title || '',
            description: doc.recipeId.description || '',
            topics: doc.recipeId.topics || [],
            $createdAt: doc.recipeId.$createdAt || '',
        }
    }
}

export const getHistoryRating = async (): Promise<HistoryRating[]> => {
    try {
        const user = await getCurrentUser();
        if (!user) return [];

        const response = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.ratingRecipe,
            [Query.equal('accountId', user.$id), Query.orderDesc("$createdAt")]
        );

        if (response.documents.length === 0) return [];

        return response.documents.map(mapDocumentToHistoryRating);
    }
    catch (error) {
        console.error("Error while fetching history rating:", error);
        return [];
    }
}