import { Comment, CommentForm } from "@/interfaces/comments";
import { database, dbConfig } from "../appwrite";
import { ID, Query } from "react-native-appwrite";
import { Alert } from "react-native";

const mapDocumentToComment = (doc: any): Comment => ({
    $id: doc.$id,
    content: doc.content,
    author: doc.author,
    $createdAt: doc.$createdAt
});

export const fetchCommentsInRecipe = async (recipeId: string): Promise<Comment[]> => {
    try {
        const comments = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.comments,
            [Query.orderDesc("$createdAt")]
        );

        return comments.documents.map(mapDocumentToComment);
    }
    catch (error) {
        console.error(error);
        return [];
    }
}

export const createComment = async (commentData: CommentForm) => {
    try {
        const response = await database.createDocument(
            dbConfig.db,
            dbConfig.collection.comments,
            ID.unique(),
            {
                content: commentData.content,
                userId: commentData.userId,
                recipeId: commentData.recipeId
            }
        );

        console.log("Comment created successfully:", response);
    }
    catch (error) {
        console.error(error);
    }
}

export const deleteComment = async (commentId: string) => {
    Alert.alert(
        "Delete Comment",
        "Do you sure you want to delete this comment?",
        [
            {text: "Cancel", style: 'cancel'},
            {
                text: "OK", 
                onPress: async () => {
                    try {
                        await database.deleteDocument(
                            dbConfig.db,
                            dbConfig.collection.comments,
                            commentId
                        );
                        console.log("Comment deleted successfully!");
                    }
                    catch (error) {
                        console.log("Failed ", error);
                    }
                }
            }
        ]
    );
}