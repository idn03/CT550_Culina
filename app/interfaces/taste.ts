export interface Taste {
    $id: string;
    topics: string[];
    favoriteChefs: string[];
    optional: number;
}

export interface CreateTasteForm {
    accountId: string;
    topics: string[];
    favoriteChefs: string[];
    optional: number;
}