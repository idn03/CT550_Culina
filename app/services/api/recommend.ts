import axios from "axios";
import { Query } from "react-native-appwrite";
import { database, dbConfig } from "../appwrite";
import { mapDocumentToRecipe } from "./recipes";
import { Recipe } from "@/interfaces/recipe";
import { API_BASE_URL } from "../axios";

interface PrepareDatasetResponse {
    status: string;
    dataset: { recipeId: string; userId: string; rating: number }[];
}

export const getTopPredict = async () => {
    try {
        const res = await axios.get<PrepareDatasetResponse>(`${API_BASE_URL}/prepare-dataset`);
        if (res.data.status !== "success") return [];

        const sortedDataset = res.data.dataset.sort((a, b) => b.rating - a.rating);

        const recipeIds = sortedDataset.map(item => item.recipeId);
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

        return response.documents.map(mapDocumentToRecipe);
    }
    catch (error) {
        console.error(error);
        return [];
    }
}