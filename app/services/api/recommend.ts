import axios from "axios";
import { Query } from "react-native-appwrite";
import { database, dbConfig } from "../appwrite";
import { mapDocumentToRecipe } from "./recipes";
import { Recipe } from "@/interfaces/recipe";
import { API_BASE_URL } from "../axios";
import { getCurrentUser } from "./auth";

interface RecommendationResponse {
    status: string;
    recommendations: {
        recipeId: string;
        predictedRating: number;
        confidence: number;
    }[];
}

export const getTopPredict = async () => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) return [];

        const res = await axios.get<RecommendationResponse>(`${API_BASE_URL}/load_model/${currentUser.$id}`);
        if (res.data.status !== "success") return [];

        const sortedRecommendations = res.data.recommendations.sort((a, b) => b.predictedRating - a.predictedRating);

        const recipeIds = sortedRecommendations.map(item => item.recipeId);
        return recipeIds;
    } catch (err) {
        console.error(err);
        return [];
    }
};

export const getRecommendList = async (): Promise<Recipe[]> => {
    try {
        const recipes = await getTopPredict();

        const response = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.recipes,
            [
                Query.equal("$id", recipes)
            ]
        );

        if (!response) return [];

        const recipeMap = new Map(recipes.map((id, index) => [id, index]));
        
        const sortedDocuments = response.documents.sort((a, b) => {
            const indexA = recipeMap.get(a.$id) ?? 0;
            const indexB = recipeMap.get(b.$id) ?? 0;
            return indexA - indexB;
        });

        return sortedDocuments.map(mapDocumentToRecipe);
    }
    catch (error) {
        console.error(error);
        return [];
    }
}