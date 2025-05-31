import { Recipe } from "./recipe";

export interface UserAuth {
    $id: string;
    email: string;
}

export interface SimpleUser {
    $id: string;
    fullname: string;
    avatar: string;
}

export interface UserAchievement {
    $id: string;
    fullname: string;
    goals: string[];
}

export interface UserRecipes {
    owned: Recipe[];
    saved: Recipe[];
}

export interface Profile {
    $id: string;
    email: string;
    fullname: string;
    slogan: string;
    age: number;
    gender: string;
    avatar: string;
    totalRecipe: number;
    totalSaved: number;
    average: number;
}