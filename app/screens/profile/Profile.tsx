// Hooks
import React, { useState, useEffect } from 'react';

// Components
import {View, StyleSheet} from 'react-native';
import { Header, Loading, Line } from '@components/index';
import AccountInfo from './AccountInfo';
// import SimpleRecipeList from './SimpleRecipeList';


// Other
import { fetchCurrentUser } from '@services/api/users';
import { fetchCurrentUserRecipes, fetchCurrentUserSavedRecipes } from '@services/api/recipes';
import { getUserAverage } from '@services/api/users';
import { Recipe } from '@/interfaces/recipe';
import { Profile } from '@/interfaces/user';
import { useGlobalContext } from '@utils/GlobalProvider';

const ProfileScreen = () => {
    const [profile, setProfile] = useState<Profile>();
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
    const [selected, setSelected] = useState('left');
    const { refresh } = useGlobalContext();

    const loadUserInfo = async () => {
        const userFetched = await fetchCurrentUser();
        if (userFetched) {
            setProfile(prevState => ({
                ...userFetched,
                totalRecipe: prevState?.totalRecipe ?? 0,
                average: prevState?.average ?? 0,
                totalSaved: prevState?.totalSaved ?? 0
            }));
        }
        setLoading(false);
    };

    const loadUserAverage = async () => {
        const averageFetched = await getUserAverage();
        if (averageFetched && profile) {
            setProfile({
                ...profile,
                average: averageFetched,
            });
        }
        else {
            console.error("Error fetching user average");
        }
        setLoading(false);
    };

    const loadUserRecipes = async () => {
        const recipeFetched = await fetchCurrentUserRecipes();
        if (recipeFetched && profile) {
            setRecipes(recipeFetched);
            setProfile({
                ...profile,
                totalRecipe: recipeFetched.length,
            });
        }
        else {
            console.error("Error fetching user recipes");
        }
        setLoading(false);
    }

    const loadUserSavedRecipes = async () => {
        const recipeFetched = await fetchCurrentUserSavedRecipes();
        if (recipeFetched && profile) {
            setSavedRecipes(recipeFetched);
            setProfile({
                ...profile,
                totalSaved: recipeFetched.length,
            });
        }
        else {
            console.error("Error fetching user saved recipes");
        }
        setLoading(false);
    }

    useEffect(() => {
        loadUserSavedRecipes();
        loadUserRecipes();
        loadUserAverage();
        loadUserInfo();
    }, [refresh]);

    return (
        <View></View>
    );
};

export default ProfileScreen;