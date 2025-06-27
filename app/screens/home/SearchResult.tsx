// Hooks
import React, { useEffect, useState } from 'react';

// Components
import { View, StyleSheet, FlatList } from 'react-native';
import { LayoutOnePost } from '@screens/recipeLayout/LayoutOne';
import { LayoutTwoPost } from '@screens/recipeLayout/LayoutTwo';
import { Loading } from '@components/index';

// Other
import { searchRecipes } from '@services/api/recipes';
import { Recipe } from '@interfaces/recipe';
import { spacings } from '@utils/CulinaStyles';

interface SearchResultProps {
    q: string;
    ls: number;
    hs: number;
    t: string[];
    a: boolean;
}

const SearchResult: React.FC<SearchResultProps> = ({ q, ls, hs, t, a }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (q !== "" || t.length > 0 || a) {
            searching();
        }
    }, [q, ls, hs, t, a]);

    const searching = async () => {
        setLoading(true);

        try {
            const result = await searchRecipes(q, ls, hs, t, a);
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
            ) : (
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.$id}
                    renderItem={({ item }) => {
                        return item.layout === "horizontal" ? (
                            <LayoutOnePost
                                recipeId={item.$id}
                                author={item.author}
                                datePost={item.$createdAt}
                                recipeImg={item.recipeImg}
                                title={item.title}
                                description={item.description}
                            />
                        ) : (
                            <LayoutTwoPost
                                recipeId={item.$id}
                                author={item.author}
                                datePost={item.$createdAt}
                                recipeImg={item.recipeImg}
                                title={item.title}
                                description={item.description}
                            />
                        );
                    }}
                    showsVerticalScrollIndicator={false}
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
