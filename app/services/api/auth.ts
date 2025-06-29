import { ID, Query } from 'react-native-appwrite';
import { Alert, Platform } from 'react-native';
import { dbConfig, database, account } from './../appwrite';
import { removeData, StorageKeys } from './asyncStorage';

const defaultAvt = {
    id: 'D_avatar',
    url: 'https://fra.cloud.appwrite.io/v1/storage/buckets/67a6c19c003620a84cea/files/6860a6c8003a4cf1a919/view?project=67a34d78001b4d38331a&mode=admin'
};

export const createUser = async (email: string, password: string, fullname: string, gender: string, age: number) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password);

        if (!newAccount) throw new Error('Failed to create account!');

        const newUser = await database.createDocument(
            dbConfig.db,
            dbConfig.collection.users,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                fullname,
                gender,
                age,
                slogan: '',
                avatar: defaultAvt.url,
            }
        );

        return newUser;
    }
    catch (error) {
        console.log(error);
        throw new Error(String(error));
    }
}

export const signIn = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);

        return session;
    }
    catch (error) {
        console.log(error);
        throw new Error(String(error));
    }
};

export const getCurrentUser = async () => {
    try {
        if (!Platform || !Platform.OS) {
            throw new Error('Platform not initialized');
        }

        const currentAccount = await account.get();

        if (!currentAccount || !currentAccount.$id) {
            throw new Error('Failed to get current account!');
        }

        const currentUserResponse = await database.listDocuments(
            dbConfig.db,
            dbConfig.collection.users,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUserResponse || !currentUserResponse.documents.length) {
            throw new Error('There are no users with this ID!');
        }

        return currentUserResponse.documents[0];
    } catch (error) {
        console.log(error);
    }
};

export const signOut = async (setIsLoggedIn: (value: boolean) => void, setUser: (value: any) => void, navigation: any) => {
    Alert.alert(
        "Log Out",
        "Are you sure you want to log out?",
        [
            { text: "Cancel", style: "cancel" },
            {
                text: "OK",
                onPress: async () => {
                    try {
                        await account.deleteSession('current');
                        setIsLoggedIn(false);
                        setUser(null);

                        await removeData(StorageKeys.REMEMBER_ME);
                        await removeData(StorageKeys.accountId);

                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }]
                        });
                    } catch (error) {
                        console.error('Logout Failed:', error);
                        Alert.alert("Error", "Failed to log out. Please try again.");
                    }
                }
            }
        ]
    );
};