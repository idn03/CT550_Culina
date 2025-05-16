// Hooks
import React, { useEffect, useState, useCallback } from 'react';

// Components
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Loading } from './../../components';
import RecipePost from './../recipeLayout/RecipePost';

// Other
import { fetchNewestRecipes, Recipe } from './../../services/api/recipes';
import { useGlobalContext } from './../../utils/GlobalProvider';

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
        <View style={styles.newFeedContainer}>
            {loading && recipes.length === 0 ? (
                <Loading />
            ) : (
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.$id}
                    renderItem={({ item }) => (
                        <RecipePost
                            recipeId={item.$id}
                            avatar={item.author.avatar}
                            author={item.author.fullname}
                            datePost={item.$createdAt}
                            thumbnail={item.recipeImg}
                            title={item.title}
                            subtitle={item.subtitle}
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

            <View style={{margin: 50}}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    newFeedContainer: {
        flex: 1,
        paddingHorizontal: 30,
    },
});

export default Newfeed;