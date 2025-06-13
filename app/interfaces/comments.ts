import { SimpleUser } from "./user";

export interface Comment {
    $id: string;
    content: string;
    author: SimpleUser;
    $createdAt: string;
}

export interface CommentForm {
    content: string;
    userId: string;
    recipeId: string;
}