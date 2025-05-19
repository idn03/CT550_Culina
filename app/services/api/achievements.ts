import { Query } from 'react-native-appwrite';
import { Alert } from 'react-native';
import { dbConfig, database } from './../appwrite';
import { getCurrentUser } from './auth';
import CulinaImgs from '@assets/index';
import { fetchCurrentUserSavedRecipes, fetchCurrentUserRecipes } from './recipes';
import { getUserAverage } from './users';
import { UserAchievement } from '@interfaces/user';
import { Recipe } from '@interfaces/recipe';

export const dummyAchievements = [
    {
        $id: '1',
        name: '1ST',
        description: 'You are the first Culina member.',
        thumbnail: CulinaImgs.achievementThumbnails.one
    },
    {
        $id: '2',
        name: 'Recipes Creator',
        description: 'Post 5 recipes.',
        thumbnail: CulinaImgs.achievementThumbnails.bread
    },
    {
        $id: '3',
        name: 'The Collector',
        description: 'Save 5 recipes for yourself.',
        thumbnail: CulinaImgs.achievementThumbnails.map
    },
    {
        $id: '4',
        name: 'Mr. Prestige',
        description: 'Your average score is higher than 7.',
        thumbnail: CulinaImgs.achievementThumbnails.crystal
    },
    {
        $id: '5',
        name: 'All for One',
        description: 'Post a recipe that has more than 5 inrgredients.',
        thumbnail: CulinaImgs.achievementThumbnails.muscle
    },
    {
        $id: '6',
        name: 'Today is not today',
        description: 'Have a post in 30 / 4.',
        thumbnail: CulinaImgs.achievementThumbnails.weekend
    },
];

export const fetchUserAchievements = async () => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            throw new Error("User is not authenticated");
        }

        const claimed = currentUser.achievements || [];

        return claimed;
    }
    catch (error) {
        console.error("Failed to fetch achievements:", error);
        return [];
    }
};

export const goalByUser = async (achieveId: string) => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            throw new Error("User is not authenticated");
        }

        const claimed = currentUser.achievements || [];
        if (!claimed.includes(achieveId)) {
            const updatedClaimed = [...claimed, achieveId];
            console.log(updatedClaimed);

            const response = await database.updateDocument(
                dbConfig.db,
                dbConfig.collection.users,
                currentUser.$id,
                {achievements: updatedClaimed}
            );
            console.log(response);

            Alert.alert('Success', 'Achievement claimed!');

            return updatedClaimed;
        }
        else {
            console.log('Achievement is claimed');
            return achieveId;
        }

    }
    catch (error) {
        console.error("Failed to update achievement:", error);
    }
};

export const totalGoals = async (): Promise<string> => {
    const user = await getCurrentUser();
    
    if (!user) return '';

    return user.achievements.length;
};

export const getTopRank = async (): Promise<UserAchievement[]> => {
    try {
        const response = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.users,
            [
                Query.orderDesc('achievements'),
                Query.limit(3)
            ]
        );
        if (response.documents.length === 0) {
            return [];
        }

        return response.documents.map(doc => ({
            $id: doc.$id,
            fullname: doc.fullname || '',
            goals: doc.achievements || []
        }));
    }
    catch (error) {
        console.error(error);
        return [];
    }
};

export const goalCheck = async () => {
    try {
        const userRecipes = await fetchCurrentUserRecipes();
        if (!userRecipes) {
            console.log("No recipes found");
        }

        const savedRecipes = await fetchCurrentUserSavedRecipes();
        if (!savedRecipes) {
            console.log("No saved recipes found");
        }

        const average = await getUserAverage();
        if (!average) {
            console.log("No average score found");
        }

        const result = [];

        if (userRecipes.length >= 5) {
            result.push('2');
        }

        if (savedRecipes.length >= 5) {
            result.push('3');
        }

        if (average >= 7) {
            result.push('4');
        }

        userRecipes.forEach((item: Recipe) => {
            if (item.ingredients.length >= 8) result.push('5');
            // if (item.$createdAt) result.push('6');
        });

        return result;
    }
    catch (error) {
        console.error(error);
    }
};