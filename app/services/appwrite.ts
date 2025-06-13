import { Client, Databases, Account, Storage } from 'react-native-appwrite';

const dbConfig = {
    endpoint: 'https://fra.cloud.appwrite.io/v1',
    projectId: '67a34d78001b4d38331a',
    db: "67a350560013120724fa",
    collection: {
        users: '67b46f73002bdaa8ecb8',
        recipes: '67b6e2930002f4e5f9b0',
        savedRecipes: '67c43b690006a92ae6a1',
        ratingRecipe: '67b6e5b1000b0b19a159',
        achievements: '67c43bd5000949bb8f96',
        comments: '68386edb00054a527cf8',
    },
    storageId: '67a6c19c003620a84cea',
};

const client = new Client()
    .setEndpoint(dbConfig.endpoint)
    .setProject(dbConfig.projectId)
    .setPlatform('culina.ios')
;

const database = new Databases(client);

const account = new Account(client);

const storage = new Storage(client);

export { dbConfig, client, database, account, storage };