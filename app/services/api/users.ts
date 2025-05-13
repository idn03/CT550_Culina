import { Query } from 'react-native-appwrite';
import { database, dbConfig } from '../appwrite';
import { getCurrentUser } from './auth';
import { getRecipeScore } from './recipes';

export interface SimpleUser {
    $id: string;
    fullname: string;
    email: string;
    age: number;
    gender: string;
    avatar: string;
    role: string;
}

const mapDocumentToUser = (doc: any): SimpleUser => ({
    $id: doc.$id,
    fullname: doc.fullname,
    email: doc.email,
    age: doc.age,
    gender: doc.gender,
    avatar: doc.avatar,
    role: doc.role,
}); 

export const fetchAllUsers = async (): Promise<SimpleUser[]> => {
    try {
        const allUsers = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.users,
            [Query.orderAsc("$createdAt")]
        );

        return allUsers.documents.map(mapDocumentToUser);
    }
    catch (error) {
        console.error("Error fetching all users:", error);
        return [];
    }
};

export const fetchCurrentUser = async () => {
    try {
        const userFetched = await getCurrentUser();
        if (userFetched) {
            return {
                $id: userFetched.$id,
                avatar: userFetched.avatar,
                fullname: userFetched.fullname,
                age: userFetched.age,
                gender: userFetched.gender,
                role: userFetched.role,
                slogan: userFetched.slogan || 'Have fun with Culina! Have fun with Culina!',
            };
        } else {
            console.log('Failed to fetch user info');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
    }
};

export const editUserInfo = async (userData: SimpleUser): Promise<void> => {
    const user = await fetchCurrentUser();

    if (!user) return;
    console.log(user);

    const updatedUser = {
        ...user,
        ...userData
    };

    try {
        const response = await database.updateDocument(
            dbConfig.db,
            dbConfig.collection.users,
            user.$id,
            updatedUser
        );

        console.log(response);
        return;
    }
    catch (error) {
        console.error("Error edit info:", error);
        throw error;
    }
};

export const getUserAverage = async () => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            throw new Error("User is not authenticated");
        }

        const response = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.recipes,
            [Query.equal('accountId', currentUser.$id)]
        );

        if (response.documents.length === 0) {
            return 0;
        }

        const scores = await Promise.all(
            response.documents.map(async (doc: any) => {
                const recipeId = doc.$id;
                try {
                    const recipeScore = await getRecipeScore(recipeId);
                    return recipeScore || 0;
                } catch (error) {
                    console.error(`Failed to fetch score for recipe ${recipeId}:`, error);
                    return 0;
                }
            })
        );

        const totalScore = scores.reduce((sum, score) => sum + score, 0);
        const averageScore = totalScore / scores.length;

        return averageScore;
    }
    catch (error) {
        console.error("Failed to fetch user average:", error);
        return 0;
    }
}