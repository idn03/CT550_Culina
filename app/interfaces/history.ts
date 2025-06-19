import { SimpleRecipe } from "./recipe"
import { SimpleUser } from "./user";

export interface HistoryRating {
    $id: string;
    author: SimpleUser;
    recipeData: SimpleRecipe;
    score: number;
    ratedOn: string;
}

export interface HistoryComment {

}