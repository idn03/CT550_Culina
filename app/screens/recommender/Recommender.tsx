import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Image, FlatList, Pressable, Animated } from 'react-native';
import { Header, InriaTitle, NormalText, TextBold, Loading } from '@/components';
import { LayoutOnePost } from '@screens/recipeLayout/LayoutOne';
import { LayoutTwoPost } from '@screens/recipeLayout/LayoutTwo';
import { Recipe } from "@/interfaces/recipe";
import { getRecommendList } from "@/services/api/recommend";
import CulinaImgs from "@/assets";
import { spacings } from "@utils/CulinaStyles";

const RecommenderScreen = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;

    const fadeOut = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: -50,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => setShowIntro(false));
    };

    const fadeIn = () => {
        setShowIntro(true);
        slideAnim.setValue(50);
        fadeAnim.setValue(0);
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();
    };

    const loadTopRate = async () => {
        try {
            setLoading(true);

            const rs = await getRecommendList();
            setRecipes(rs);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTopRate();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Header>Recommender</Header>

            {loading ? (
                <Loading />
            ) : (
                <View style={[styles.main, spacings.ph8, spacings.pt4]}>
                    {showIntro ? (
                        <Animated.View
                            style={[
                                spacings.mb4,
                                {
                                    opacity: fadeAnim,
                                    transform: [{ translateY: slideAnim }]
                                }
                            ]}
                        >
                            <Image source={CulinaImgs.stickerTwo} style={styles.aiStickers} />
                            <View>
                                <InriaTitle>Let A.I Assistant Recommend Recipes For You</InriaTitle>
                                <NormalText>By tracking user behaviors, Culina 2 can remember what is your favorite foods, I will recommend some related recipes around it.</NormalText>
                                <Pressable onPress={fadeOut} style={{ marginTop: 8, alignSelf: 'flex-end' }}>
                                    <TextBold>Hide</TextBold>
                                </Pressable>
                            </View>
                        </Animated.View>
                    ) : (
                        <Animated.View
                            style={{
                                opacity: fadeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 0]
                                })
                            }}
                        >
                            <Pressable onPress={fadeIn} style={spacings.mb4}>
                                <TextBold>Show Intro</TextBold>
                            </Pressable>
                        </Animated.View>
                    )}

                    <FlatList
                        data={recipes}
                        keyExtractor={(item) => item.$id}
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
                        onEndReachedThreshold={0.5}
                    />

                    <View style={[spacings.m9]}></View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        width: '100%',
    },
    aiStickers: {
        width: 60,
        height: 60,
    }
});

export default RecommenderScreen;