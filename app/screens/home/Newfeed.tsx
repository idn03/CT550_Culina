// Hooks
import React, { useEffect, useState, useCallback } from 'react';

// Components
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Loading } from '@components/index';
import RecipePost from '@/components/reuse/RecipePost';

// Other
import { fetchNewestRecipes } from '@services/api/recipes';
import { Recipe } from '@interfaces/recipe';
import { useGlobalContext } from '@utils/GlobalProvider';
import { spacings } from '@utils/CulinaStyles';

const Newfeed = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const { refresh } = useGlobalContext();

    const loadNewfeed = async () => {
        setLoading(true);
        
        try {
            const result = await fetchNewestRecipes();
            setRecipes(result);
        } catch (error) {
            console.error("Error loading recipes:", error);
        }
        setLoading(false);
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadNewfeed();
        setRefreshing(false);
    }, [refresh]);

    useEffect(() => {
        loadNewfeed();
    }, [refresh]);

    return (
        <View style={[styles.newFeedContainer, spacings.ph8]}>
            {loading && recipes.length === 0 ? (
                <Loading />
            ) : (
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.$id}
                    renderItem={({ item, index }) => (
                        <RecipePost
                            seq={index}
                            recipeId={item.$id}
                            author={item.author}
                            datePost={item.$createdAt}
                            recipeImg={item.recipeImg}
                            title={item.title}
                            description={item.description}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    pagingEnabled={true}
                    snapToAlignment="start"
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing} 
                            onRefresh={onRefresh} 
                            colors={["#333"]} 
                            style={{marginTop: -20}}
                        />
                    }
                />
            )}

            <View style={[spacings.m9]}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    newFeedContainer: {flex: 1},
});

export default Newfeed;