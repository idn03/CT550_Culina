// Hooks
import React, { useEffect, useState, useCallback, useRef } from 'react';

// Components
import { View, StyleSheet, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { CopilotStep, walkthroughable } from "react-native-copilot";
import Feather from '@expo/vector-icons/Feather';
import { Loading, Row, TextBold } from '@/components';
import { LayoutOnePost } from '@screens/recipeLayout/LayoutOne';
import { LayoutTwoPost } from '@screens/recipeLayout/LayoutTwo';

// Other
import { fetchNewestRecipes } from '@services/api/recipes';
import { Recipe } from '@interfaces/recipe';
import { useGlobalContext } from '@utils/GlobalProvider';
import { spacings } from '@utils/CulinaStyles';

const WalkthroughableView = walkthroughable(View);

const Newfeed = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [returnTop, setReturnTop] = useState(false);
    const flatListRef = useRef<FlatList>(null);
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

    const handleScroll = (event: any) => {
        const scrollPosition = event.nativeEvent.contentOffset.y;
        setReturnTop(scrollPosition > 200);
    };

    const scrollToTop = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
    };

    useEffect(() => {
        loadNewfeed();
    }, [refresh]);

    return (
        <View style={[styles.newFeedContainer, spacings.ph8]}>
            {loading && recipes.length === 0 ? (
                <Loading />
            ) : (
                <CopilotStep
                    text="This is where the latest recipes from the community are displayed. Swipe vertically to explore more!"
                    order={3}
                    name="Newfeed"
                >
                    <WalkthroughableView style={{ flex: 1 }}>
                        <FlatList
                            data={recipes}
                            keyExtractor={(item) => item.$id}
                            ref={flatListRef}
                            onScroll={handleScroll}
                            renderItem={({ item, index }) => {
                                return item.layout === "horizontal" ? (
                                    <LayoutOnePost
                                        seq={index}
                                        recipeId={item.$id}
                                        author={item.author}
                                        datePost={item.$createdAt}
                                        recipeImg={item.recipeImg}
                                        title={item.title}
                                        description={item.description}
                                    />
                                ) : (
                                    <LayoutTwoPost
                                        seq={index}
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
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={["#333"]}
                                    style={{ marginTop: -20 }}
                                />
                            }
                        />
                        {returnTop && (
                            <TouchableOpacity
                                style={[styles.toTopBtn, spacings.p4]}
                                onPress={scrollToTop}
                                activeOpacity={0.8}
                            >
                                <Row>
                                    <Feather name="chevrons-up" size={24} color="#333" />
                                    <TextBold>Return to top</TextBold>
                                </Row>
                            </TouchableOpacity>
                        )}
                    </WalkthroughableView>
                </CopilotStep>
            )}

            <View style={[spacings.m9]}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    newFeedContainer: { flex: 1 },
    toTopBtn: {
        zIndex: 1,
        bottom: 32,
        borderRadius: 20,
        alignSelf: 'flex-start',
        backgroundColor: '#FFF'
    }
});

export default Newfeed;