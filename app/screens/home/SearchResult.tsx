import React, { useEffect, useState, } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import RecipePost from './../recipeLayout/RecipePost';
import { Loading, NormalText } from './../../components';
import { searchRecipes, Recipe } from './../../services/api/recipes';

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
        <View style={styles.searchResult}>
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

            <View style={{margin: 50}}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    searchResult: {
        flex: 1,
        padding: 30,
        marginTop: -60,
    },
});

export default SearchResult;
