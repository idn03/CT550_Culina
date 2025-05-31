import React, { useEffect, useState, } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import RecipePost from '../../components/reuse/RecipePost';
import { Loading } from './../../components';
import { searchRecipes } from './../../services/api/recipes';
import { Recipe } from '../../interfaces/recipe';
import { spacings } from '../../utils/CulinaStyles';

interface SearchResultProps {
    q: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ q }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (q !== "") {
            searching();
        }
    }, [q]);

    const searching = async () => {
        setLoading(true);

         try {
            const result = await searchRecipes(q);
            setRecipes(result);
        } catch (error) {
            console.error("Error loading recipes:", error);
        }
        setLoading(false);
    }

    return (
        <View style={[styles.searchResult, spacings.p8]}>
            {loading ? (
                <Loading />
            ): (
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
                />
            )}

            <View style={[spacings.m9]}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    searchResult: {
        flex: 1,
        marginTop: -60,
    },
});

export default SearchResult;
