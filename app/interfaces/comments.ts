import { SimpleUser } from "./user";

export interface Comment {
    $id: string;
    content: string;
    author: SimpleUser;
    $createdAt: string;
}