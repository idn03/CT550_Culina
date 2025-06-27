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
    const flatListRef = useRef<FlatList>(null);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [returnTop, setReturnTop] = useState(false);
    const [offset, setOffset] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);
    const { refresh } = useGlobalContext();
    const LIMIT = 25;

    const loadNewfeed = async (reset = false) => {
        setLoading(true);

        if (loading || loadingMore) return;
        if (reset) setOffset(0);
        if (reset) setLoading(true);
        else setLoadingMore(true);

        try {
            const result = await fetchNewestRecipes(LIMIT, reset ? 0 : offset);
            setRecipes(reset ? result : [...recipes, ...result]);
            setOffset((prev) => prev + result.length);
        } catch (error) {
            console.error("Error loading recipes:", error);
        }

        if (reset) {
            setLoading(false);
        } else {
            setLoadingMore(false);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadNewfeed(true);
        setRefreshing(false);
    }, [refresh]);

    const handleEndReached = () => {
        if (!loadingMore && recipes.length >= LIMIT) {
            loadNewfeed(false);
        }
    };

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
        loadNewfeed(true);
    }, [refresh]);

    return (
        <View style={[styles.newFeedContainer, spacings.ph8]}>
            {loading && recipes.length === 0 ? (
                <Loading />
            ) : (
                <CopilotStep
                    text="This is where the latest recipes from the community are displayed. Swipe vertically to explore more! Tap on post to see detail!"
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
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={["#333"]}
                                    style={{ marginTop: -20 }}
                                />
                            }
                            onEndReached={handleEndReached}
                            onEndReachedThreshold={0.5}
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