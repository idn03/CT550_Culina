import { Recipe } from "./recipe";

export interface SimpleUser {
    $id: string;
    fullname: string;
    email: string;
    age: number;
    gender: string;
    avatar: string;
    role: string;
}

export interface UserInfo {
    avatar: string;
    fullname: string;
    slogan: string;
    recipes: number;
    average: number;
    saved: number;
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