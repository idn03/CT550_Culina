// Hooks
import React, { useState, useEffect } from 'react';

// Components
import { View, StyleSheet } from 'react-native';
import { Header, Loading, Line, TextBold } from '@components/index';
import AccountInfo from './AccountInfo';
import AccountRecipes from './AccountRecipes';


// Other
import { fetchCurrentUser } from '@services/api/users';
import { fetchCurrentUserRecipes, fetchCurrentUserSavedRecipes } from '@services/api/recipes';
import { getUserAverage } from '@services/api/users';
import { Recipe } from '@/interfaces/recipe';
import { Profile } from '@/interfaces/user';
import { useGlobalContext } from '@utils/GlobalProvider';
import { spacings } from '@utils/CulinaStyles';

const ProfileScreen = () => {
    const [profile, setProfile] = useState<Profile>();
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
    const [selected, setSelected] = useState('l');
    const { refresh } = useGlobalContext();

    const loadUserInfo = async () => {
        const userFetched = await fetchCurrentUser();
        if (userFetched) {
            setProfile(userFetched);
        }
        setLoading(false);
    };

    const loadUserAverage = async () => {
        const averageFetched = await getUserAverage();
        if (averageFetched && profile) {
            setProfile(prevProfile => {
                if (!prevProfile) return prevProfile;
                return {
                    ...prevProfile,
                    average: averageFetched,
                };
            });
        }
        else {
            console.log("There are 0 recipes to get user average");
        }
        setLoading(false);
    };

    const loadUserRecipes = async () => {
        const recipeFetched = await fetchCurrentUserRecipes();
        if (recipeFetched) {
            setRecipes(recipeFetched);
            setProfile(prevProfile => {
                if (!prevProfile) return prevProfile;
                return {
                    ...prevProfile,
                    totalRecipe: recipeFetched.length,
                };
            });
        } else {
            console.log("There are no user recipe");
        }
        setLoading(false);
    }

    const loadUserSavedRecipes = async () => {
        const recipeFetched = await fetchCurrentUserSavedRecipes();
        if (recipeFetched) {
            setSavedRecipes(recipeFetched);
            setProfile(prevProfile => {
                if (!prevProfile) return prevProfile;
                return {
                    ...prevProfile,
                    totalSaved: recipeFetched.length,
                };
            });
        } else {
            console.log("There are no user saved recipe");
        }
        setLoading(false);
    }

    useEffect(() => {
        const loadAllData = async () => {
            setLoading(true);
            try {
                await loadUserInfo();

                await Promise.all([
                    loadUserRecipes(),
                    loadUserSavedRecipes(),
                ]);

                await loadUserAverage();
            } catch (error) {
                console.error('Error loading profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadAllData();
    }, [refresh]);

    return (
        <View style={styles.container}>
            <Header>Profile</Header>
            {loading ? (
                <Loading />
            ) : profile ? (
                <View style={{ flex: 1, ...spacings.mh8 }}>
                    <AccountInfo
                        $id={profile.$id}
                        email={profile.email}
                        avatar={profile.avatar}
                        fullname={profile.fullname}
                        age={profile.age}
                        gender={profile.gender}
                        slogan={profile.slogan}
                        totalRecipe={profile.totalRecipe}
                        average={profile.average}
                        totalSaved={profile.totalSaved}
                    />

                    <Line style={{ ...spacings.mv6 }} />

                    <View style={{ flex: 1 }}>
                        <AccountRecipes
                            recipes={selected === 'l' ? recipes : savedRecipes}
                            loading={loading}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </View>
                </View>
            ) : (
                <TextBold>Error while fetching user</TextBold>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
});

export default ProfileScreen;