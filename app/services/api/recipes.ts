import { ID, Permission, Role, Query } from "react-native-appwrite";
import {dbConfig, database} from '../appwrite';
import { getCurrentUser } from './auth';
import { Alert } from "react-native";
import { AddRecipeForm, Recipe } from "@interfaces/recipe";

export const dummyTopics = [
    { seq: 1, title: 'Dessert', },
    { seq: 2, title: 'Healthy', },
    { seq: 3, title: 'Vegan', },
    { seq: 4, title: 'Fast Food', },
    { seq: 5, title: 'Soup', },
    { seq: 6, title: 'Fruit', },
    { seq: 7, title: 'Flavorful', }
];

const mapDocumentToRecipe = (doc: any): Recipe => ({
    $id: doc.$id,
    title: doc.title,
    layout: doc.layout,
    description: doc.description,
    topics: doc.topics,
    ingredients: doc.ingredients,
    instructions: doc.instructions,
    author: doc.accountId,
    recipeImg: doc.recipeImg,
    $createdAt: doc.$createdAt,
});

export const fetchNewestRecipes = async (): Promise<Recipe[]> => {
    try {
        const newestRecipes = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.recipes,
            [Query.orderDesc("$createdAt")]
        );

        return newestRecipes.documents.map(mapDocumentToRecipe);
    }
    catch (error) {
        console.error("Error fetching newest recipes:", error);
        return [];
    }
};

export const fetchCurrentUserSavedRecipes = async (): Promise<Recipe[]> => {
    try {
        const user = await getCurrentUser();
        if (!user) return [];

        const savedRecipesResponse = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.savedRecipes,
            [Query.equal('accountId', user.$id)]
        );

        const savedRecipes = savedRecipesResponse.documents.map((doc: any) => {
            const recipeDoc = doc.recipeId;
            return mapDocumentToRecipe(recipeDoc);
        });

        return savedRecipes;
    }
    catch (error) {
        console.error("Error fetching saved recipes:", error);
        return [];
    }
};

export const fetchCurrentUserRecipes = async () => {
    try {
        const user = await getCurrentUser();
    
        if (!user) return;
        
        return user.recipes;
    }
    catch (error) {
        console.error("Error fetching current user recipes:", error);
        return [];
    }
};

export const fetchRecipeDetail = async (recipeId: string): Promise<Recipe> => {
    try {
        if (!recipeId || typeof recipeId !== "string") {
            throw new Error("Invalid recipeId: ID must be a non-empty string");
        }

        const response = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.recipes,
            [Query.equal('$id', [recipeId])]
        );

        if (response.documents.length > 0) {
            return mapDocumentToRecipe(response.documents[0]);
        }
        else {
            throw new Error('Recipe not found');
        }
    }
    catch (error) {
        console.log(error);
        throw new Error('Recipe not found');
    }
};

export const createRecipe = async (recipeData: AddRecipeForm): Promise<void> => {
    if (!Array.isArray(recipeData.ingredients)) {
        throw new Error("Ingredients must be an array of strings.");
    }
    const user = await getCurrentUser();

    if (!user) return;
    console.log(user);

    try {
        const response = await database.createDocument(
            dbConfig.db,
            dbConfig.collection.recipes,
            ID.unique(),
            {
                ...recipeData,
                accountId: user.$id,
            },
            [
                Permission.read(Role.user(user.accountId)),
                Permission.write(Role.user(user.accountId))
            ]
        );
    
        console.log("Recipe created successfully:", response);
    }
    catch (error) {
        console.error("Error creating recipe:", error);
        throw error;
    }
};

export const searchRecipes = async (query: string): Promise<Recipe[]> => {
    try {
        const searchQuery = Query.or([
            Query.search("title", query),
            Query.contains("ingredients", query)
        ]);

        const response = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.recipes,
            [searchQuery]
        );

        console.log('Result: ', response.documents);

        return response.documents.map(mapDocumentToRecipe);
    }
    catch (error) {
        console.log(error);
        return [];
    }
};

export const editRecipe = async (data: Recipe, recipeId: string) => {
    try {
        const cr = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.recipes,
            [Query.equal('$id', [recipeId])]
        );

        if (cr.documents.length === 0) {
            throw new Error("Recipe not found");
        }

        const currentRecipe = cr.documents[0];

        const updatedRecipe = {
            title: data.title || currentRecipe.title,
            description: data.description || currentRecipe.description,
            ingredients: data.ingredients || currentRecipe.ingredients,
            recipeImg: data.recipeImg || currentRecipe.recipeImg,
        };

        console.log(updatedRecipe);

        const response = await database.updateDocument(
            dbConfig.db,
            dbConfig.collection.recipes,
            recipeId,
            updatedRecipe
        );

        console.log(response);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};

export const deleteRecipe = async (recipeId: string, navigation: any) => {
    Alert.alert(
        "Delete Recipe",
        "Do you sure you want to delete this recipe?",
        [
            {text: "Cancel", style: 'cancel'},
            {
                text: "OK", 
                onPress: async () => {
                    try {
                        await database.deleteDocument(
                            dbConfig.db,
                            dbConfig.collection.recipes,
                            recipeId
                        );
                        console.log("Recipe deleted successfully!");
                        navigation.goBack();
                    }
                    catch (error) {
                        console.log("Failed ", error);
                    }
                }
            }
        ],
    );
};

export const getRecipeScore = async (id: string) => {
    try {
        const recipeData = await fetchRecipeDetail(id);
        if (!recipeData) return;

        const response = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.ratingRecipe,
            [Query.equal('recipeId', recipeData.$id)]
        );

        if (response.documents.length === 0) {
            return 0;
        }
        
        const totalScore = response.documents.reduce((sum: number, doc: any) => sum + doc.score, 0);
        const averageScore = totalScore / response.documents.length;
        
        return averageScore;
    }
    catch (error) {
        return null;
    }
};

export const ratingRecipe = async (id: string, s: number) => {
    try {
        const user = await getCurrentUser();
        const recipeData = await fetchRecipeDetail(id);

        if (!user) return;
        if (!recipeData) return;

        const search = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.ratingRecipe,
            [
                Query.equal('recipeId', recipeData.$id),
                Query.equal('accountId', user.$id)
            ]
        );

        if (search.documents.length > 0) {
            const response = await database.updateDocument(
                dbConfig.db,
                dbConfig.collection.ratingRecipe,
                search.documents[0].$id,
                {
                    score: s
                }
            );

            console.log(response);
            if (response.$id) {
                Alert.alert('Success', 'Thanks for rating.');
            }
        }
        else {
            const response = await database.createDocument(
                dbConfig.db,
                dbConfig.collection.ratingRecipe,
                ID.unique(),
                {
                    score: s,
                    accountId: user.$id,
                    recipeId: recipeData.$id,
                }
            );
    
            if (response.$id) {
                Alert.alert('Success', 'Thanks for rating.');
            }
        }
    }
    catch (error) {
        console.error(error);
    }
};

export const saveRecipe = async (id: string) => {
    const user = await getCurrentUser();
    const recipeData = await fetchRecipeDetail(id);

    if (!user) return;
    if (!recipeData) return;

    try {
        const response = await database.createDocument(
            dbConfig.db,
            dbConfig.collection.savedRecipes,
            ID.unique(),
            {
                accountId: user.$id,
                recipeId: recipeData.$id,
            }
        );

        if (response.$id) {
            Alert.alert('Success', 'Saved!');
        }
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
};

export const unsaveRecipe = async (id: string) => {
    try {
        const user = await getCurrentUser();
        const recipeData = await fetchRecipeDetail(id);
    
        if (!user) return;
        if (!recipeData) return;

        const sr = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.savedRecipes,
            [
                Query.equal('recipeId', recipeData.$id),
                Query.equal('accountId', user.$id)
            ]
        );

        const srId = sr.documents[0].$id;       
        
        await database.deleteDocument(
            dbConfig.db,
            dbConfig.collection.savedRecipes,
            srId
        );

        Alert.alert('Success', 'Unsave Successfully!');
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
};

export const saveRecipeCheck = async (id: string) => {
    try {
        const user = await getCurrentUser();
        const recipeData = await fetchRecipeDetail(id);
    
        if (!user) return;
        if (!recipeData) return;

        const sr = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.savedRecipes,
            [
                Query.equal('recipeId', recipeData.$id),
                Query.equal('accountId', user.$id)
            ]
        );

        if (sr.documents.length !== 0) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error(error);
        return false;
    }
};

export const isOwnedCheck = async (recipeId: string) => {
    try {
        const userRecipes = await fetchCurrentUserRecipes();

        if (!userRecipes || !Array.isArray(userRecipes)) {
            return false;
        }

        return userRecipes.some((recipe: Recipe) => recipe.$id === recipeId);
    }
    catch (error) {
        console.log("Error checking ownership");
        return false;
    }
};