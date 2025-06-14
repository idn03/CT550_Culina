import { ID, Permission, Role, Query } from "react-native-appwrite";
import { Alert } from "react-native";
import { AddRecipeForm, Recipe } from "@interfaces/recipe";
import {dbConfig, database} from '../appwrite';
import { getCurrentUser } from './auth';

export const dummyTopics = [
    { id: '15-minutes-or-less', title: '15mins or Less', },
    { id: '30-minutes-or-less', title: '30mins or Less', },
    { id: '60-minutes-or-less', title: '60mins or Less', },
    { id: 'cuisine', title: 'Cuisine', },
    { id: 'healthy', title: 'Healthy', },
    { id: 'vegetables', title: 'Vegetables', },
    { id: 'high-protein', title: 'High Protein', },
    { id: 'low-protein', title: 'Low Protein', },
    { id: 'main-dish', title: 'Main Dish', },
    { id: 'dessert', title: 'Dessert', },
    { id: 'beverage', title: 'Beverage', },
    { id: 'spicy', title: 'Spicy', },
    { id: 'kid-friendly', title: 'Kid Friendly', },
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

        const userRecipes = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.recipes,
            [Query.equal('accountId', user.$id)]
        );

        return userRecipes.documents.map(mapDocumentToRecipe);
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

export const searchRecipes = async (
    query: string, 
    lowScore: number, 
    highScore: number, 
    topics: string[],
    advance: boolean
): Promise<Recipe[]> => {
    try {
        console.log(query, lowScore, highScore, topics, advance);
        let queries = [
            Query.or([
                Query.search("title", query),
                Query.contains("ingredients", query)
            ])
        ];

        if (advance) {
            const scoreQuery = Query.and([
                Query.greaterThanEqual("score", lowScore),
                Query.lessThanEqual("score", highScore)
            ]);
            queries.push(scoreQuery);

            if (topics.length > 0) {
                const topicQuery = Query.and(
                    topics.map(topic => Query.contains("topics", [topic]))
                );
                queries.push(topicQuery);
            }
        }

        const response = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.recipes,
            queries
        );

        console.log('Result: ', response.documents);

        return response.documents.map(mapDocumentToRecipe);
    }
    catch (error) {
        console.log(error);
        return [];
    }
};

export const editRecipe = async (data: Recipe) => {
    try {
        const cr = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.recipes,
            [Query.equal('$id', [data.$id])]
        );

        if (cr.documents.length === 0) {
            throw new Error("Recipe not found");
        }

        const currentRecipe = cr.documents[0];

        const updatedRecipe = {
            title: data.title || currentRecipe.title,
            description: data.description || currentRecipe.description,
            ingredients: data.ingredients || currentRecipe.ingredients,
            instructions: data.instructions || currentRecipe.instructions,
            topics: data.topics || currentRecipe.topics,
            recipeImg: data.recipeImg || currentRecipe.recipeImg,
        };

        console.log(updatedRecipe);

        const response = await database.updateDocument(
            dbConfig.db,
            dbConfig.collection.recipes,
            data.$id,
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