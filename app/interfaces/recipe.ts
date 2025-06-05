import { SimpleUser } from "./user";

export interface Recipe {
    $id: string;
    title: string;
    layout: string;
    description: string;
    topics: string[];
    ingredients: string[];
    instructions: string[];
    author: SimpleUser;
    recipeImg: string;
    $createdAt: string;
}

export interface SimpleRecipe {
    $id: string;
    title: string;
    description: string;
    topics: string[];
    $createdAt: string;
}

export interface RecipePostInfo {
    seq: number;
    recipeId: string;
    author: SimpleUser;
    datePost: string;
    recipeImg: string;
    title: string;
    description: string;
}

export interface AddRecipeForm {
    layout: string;
    title: string;
    description: string;
    recipeImg: string;
    topics: string[];
    ingredients: string[];
    instructions: string[];
}

export interface RecipeScore {
    $id: string;
    recipeScore: number;
}