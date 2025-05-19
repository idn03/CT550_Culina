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
import { Recipe } from '@/interfaces/recipe';
// import { useGlobalContext } from '@utils/GlobalProvider';
// import { getUserAverage } from '@services/api/users';

const ProfileScreen = () => {
    const [user, setUserFetched] = useState({
        $id: '',
        avatar: 'default_avatar.png',
        fullname: '',
        age: 0,
        gender: '',
        role: 'nguoidung',
        slogan: '',
        totalRecipe: 0,
        average: 0,
        totalSaved: 0,
    });
    const [loading, setLoading] = useState(true);

    return (
        <View></View>
    );
};

export default ProfileScreen;