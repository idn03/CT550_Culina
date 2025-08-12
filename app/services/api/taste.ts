import { ID } from "react-native-appwrite";
import { dbConfig, database, account } from "../appwrite";
import { Alert } from "react-native";
import { getCurrentUser } from "./auth";
import { Taste, CreateTasteForm } from "@/interfaces/taste";
import { Query } from "appwrite";

export const dummyOptionTaste = [
    { id: 1, label: 'Many Reviews' },
    { id: 2, label: '8+ Rating' },
    { id: 3, label: 'Old but Gold' }
];

export const fetchCurrentUserTaste = async (accountId?: string) => {
    try {
        if (accountId) {
            const response = await database.listDocuments(
                dbConfig.db,
                dbConfig.collection.tastes,
                [
                    Query.equal("accountId", accountId)
                ]
            );

            if (response.documents.length != 0) return response.documents[0];
            else return;
        }

        const user = await getCurrentUser();

        if (!user) return;

        const response = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.tastes,
            [
                Query.equal("accountId", user.$id)
            ]
        );

        if (response.documents.length != 0) return response.documents[0];
        else return;
    }
    catch (error) {
        console.log(error);
        return;
    }
};

export const createTaste = async (data: CreateTasteForm) => {
    try {
        const response = await database.createDocument(
            dbConfig.db,
            dbConfig.collection.tastes,
            ID.unique(),
            {
                topics: data.topics,
                favChefs: data.favoriteChefs,
                optional: data.optional
            }
        );

        console.log(response);

        return Alert.alert('Create Taste Successfully', 'Now try the personalize newfeed');
    }
    catch (error) {
        console.log(error);
    }
};

export const editTaste = async (data: Taste) => {
    try {
        const cr = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.tastes,
            [Query.equal('$id', [data.$id])]
        );

        if (cr.documents.length === 0) {
            throw new Error("Taste not found");
        }

        const currentTaste = cr.documents[0];

        const updatedTaste = {
            topics: data.topics || currentTaste.topics,
            favChefs: data.favoriteChefs || currentTaste.favChefs,
            optional: data.optional || currentTaste.optional,
        };

        const response = await database.updateDocument(
            dbConfig.db,
            dbConfig.collection.tastes,
            data.$id,
            updatedTaste
        );

        console.log(response);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};