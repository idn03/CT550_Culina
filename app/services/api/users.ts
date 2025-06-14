import { Query } from 'react-native-appwrite';
import { database, dbConfig } from '../appwrite';
import { getCurrentUser } from './auth';
import { getRecipeScore } from './recipes';
import { Profile } from '@interfaces/user';

const mapDocumentToUser = (doc: any): Profile => ({
    $id: doc.$id,
    email: doc.email,
    fullname: doc.fullname,
    age: doc.age,
    gender: doc.gender,
    avatar: doc.avatar,
    slogan: doc.slogan || 'Have fun with Culina! Have fun with Culina!',
    totalRecipe: 0,
    totalSaved: 0,
    average: 0,
});

export const fetchAllUsers = async (): Promise<Profile[]> => {
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

export const fetchCurrentUser = async (): Promise<Profile> => {
    try {
        const userFetched = await getCurrentUser();
        if (userFetched) {
            return {
                $id: userFetched.$id,
                email: userFetched.email,
                avatar: userFetched.avatar,
                fullname: userFetched.fullname,
                age: userFetched.age,
                gender: userFetched.gender,
                slogan: userFetched.slogan,
                totalRecipe: 0,
                totalSaved: 0,
                average: 0,
            };
        } else {
            console.log('Failed to fetch user info');
            return {
                $id: '',
                email: '',
                fullname: '',
                age: 0,
                gender: '',
                avatar: '',
                slogan: '',
                totalRecipe: 0,
                totalSaved: 0,
                average: 0,
            };
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
        return {
            $id: '',
            email: '',
            fullname: '',
            age: 0,
            gender: '',
            avatar: '',
            slogan: '',
            totalRecipe: 0,
            totalSaved: 0,
            average: 0,
        };
    }
};

export const editUserInfo = async (userData: Profile): Promise<void> => {
    const user = await fetchCurrentUser();

    if (!user) return;
    console.log(user);

    const filteredData = {
      fullname: userData.fullname || user.fullname,
      age: userData.age || user.age,
      gender: userData.gender || user.gender,
      avatar: userData.avatar || user.avatar,
      email: userData.email || user.email,
      slogan: userData.slogan || user.slogan,
    };

    try {
        const response = await database.updateDocument(
            dbConfig.db,
            dbConfig.collection.users,
            user.$id,
            filteredData
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