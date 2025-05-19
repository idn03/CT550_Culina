import { SimpleUser } from "./user";

export interface Recipe {
    $id: string;
    title: string;
    subtitle: string;
    ingredients: string[];
    author: SimpleUser;
    recipeImg: string;
    $createdAt: string;
}

export interface SimpleRecipe {
    title: string;
    subtitle: string;
    ingredients: string[];
    recipeImg: string;
}

export interface RecipePostInfo {
    seq: number;
    recipeId: string;
    avatar: string;
    author: string;
    datePost: string;
    thumbnail: string;
    title: string;
    subtitle: string;
}

export interface RecipeScore {
    $id: string;
    recipeScore: number;
}