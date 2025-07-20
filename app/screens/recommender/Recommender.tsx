import { useState, useEffect } from "react";
import { View, StyleSheet, Image, FlatList, Pressable } from 'react-native';
import { CopilotStep, walkthroughable } from "react-native-copilot";
import { Header, InriaTitle, NormalText, Loading } from '@/components';
import { LayoutOnePost } from '@screens/recipeLayout/LayoutOne';
import { LayoutTwoPost } from '@screens/recipeLayout/LayoutTwo';
import { Recipe } from "@/interfaces/recipe";
import { getRecommendList } from "@/services/api/recommend";
import CulinaImgs from "@/assets";
import { spacings } from "@utils/CulinaStyles";

const WalkthroughableView = walkthroughable(View);

const RecommenderScreen = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [showIntro, setShowIntro] = useState(true);

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
                <View style={[styles.main, spacings.ph8, spacings.pt5]}>
                    {showIntro && (
                        <View style={spacings.mb4}>
                            <Image source={CulinaImgs.stickerTwo} style={styles.aiStickers} />
                            <View>
                                <InriaTitle>Let A.I Assistant Recommend Recipes For You</InriaTitle>
                                <NormalText>By tracking user behaviors, Culina 2 can remember what is your favorite foods, I will recommend some related recipes around it.</NormalText>
                                <Pressable onPress={() => setShowIntro(false)} style={{marginTop: 8, alignSelf: 'flex-end'}}>
                                    <NormalText style={{color: 'blue'}}>Hidden</NormalText>
                                </Pressable>
                            </View>
                        </View>
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