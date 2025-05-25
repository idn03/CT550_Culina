// Hooks
import { useState, useEffect } from 'react';
import {
    NavigationProp,
    useNavigation,
} from '@react-navigation/native';

// Components
import {
    View,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import {
    MenuProvider,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger
} from 'react-native-popup-menu';
import Feather from '@expo/vector-icons/Feather';
import {
    StackHeader,
    KuraleTitle,
    InriaTitle,
    NormalText,
    Row,
    TextBold,
    Line,
    Loading
} from '@components/index';
import Author from '../Author';

// Other
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from '@navigate/StackNavigator';
import { deleteRecipe, isOwnedCheck, fetchRecipeDetail, getRecipeScore } from '@services/api/recipes';
import { Recipe } from '@interfaces/recipe';
import { formatDate } from '@utils/Helper';
import { spacings, shadow } from '@utils/CulinaStyles';
import { useGlobalContext } from '@utils/GlobalProvider';

type RecipeDetailScreenRouteProp = RouteProp<StackParamList, 'RecipeDetail'>;

const RecipeDetailScreen = ({ route }: { route: RecipeDetailScreenRouteProp }) => {
    const navigation: NavigationProp<StackParamList> = useNavigation();
    const { recipeId } = route.params;
    const [recipeData, setRecipeData] = useState<Recipe>();
    const [isOwned, setIsOwned] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const datePost = recipeData ? formatDate(recipeData.$createdAt) : '';
    const { refresh, triggerRefresh } = useGlobalContext();

    useEffect(() => {
        const loadRecipeDetail = async () => {
            setLoading(true);
            try {
                const result = await fetchRecipeDetail(recipeId);
                setRecipeData(result);
            } catch (error) {
                console.error("Error loading recipe:", error);
            }
            setLoading(false);
        };

        const ownershipCheck = async () => {
            const check = await isOwnedCheck(recipeId);
            setIsOwned(check);
        };

        const loadScore = async () => {
            try {
                const result = await getRecipeScore(recipeId);

                setScore(result ? parseFloat(result.toFixed(1)) : 0);
            }
            catch (error) {
                console.error(error);
            }
        }

        loadRecipeDetail();
        loadScore();
        ownershipCheck();
    }, [recipeId, refresh]);

    if (loading) {
        return (
            <View style={styles.container}>
                <StackHeader>Detail</StackHeader>

                <Loading />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StackHeader>Detail</StackHeader>

                {recipeData && (
                    <View style={{ flex: 1 }}>
                        <Row style={{ justifyContent: 'space-between', ...spacings.ph8 }}>
                            <KuraleTitle style={{...styles.title, ...spacings.pv3, ...spacings.ph5}}>{recipeData.title}</KuraleTitle>
                            <KuraleTitle style={{...styles.score, ...spacings.p3}}>{`${score} / 10`}</KuraleTitle>
                        </Row>
                        <Image source={{ uri: recipeData?.recipeImg }} style={styles.thumbnail} />

                        <ScrollView 
                            showsVerticalScrollIndicator={false} 
                            style={[styles.postContent, shadow.boxShadowTop]}
                        >
                            <View style={[spacings.pv5, spacings.ph8]}>
                                <Row style={{ justifyContent: 'space-between', ...spacings.mv3 }}>
                                    <Author 
                                        avatar={recipeData?.author.avatar}
                                        fullname={recipeData?.author.fullname}
                                    />

                                    {isOwned && (
                                        <MenuProvider style={{ alignSelf: 'flex-end' }}>
                                            <View style={[spacings.pv4]}>
                                                <Menu>
                                                    <MenuTrigger>
                                                        <Feather name="more-horizontal" size={28} color="#333" />
                                                    </MenuTrigger>

                                                    <MenuOptions customStyles={optionsStyles}>
                                                        <MenuOption onSelect={() => navigation.navigate('EditRecipe', { recipeId })}>
                                                            <NormalText>Edit recipe</NormalText>
                                                        </MenuOption>
                                                        <MenuOption
                                                            onSelect={() => {
                                                                deleteRecipe(recipeData.$id, navigation);
                                                                triggerRefresh();
                                                            }}
                                                        >
                                                            <NormalText>Delete</NormalText>
                                                        </MenuOption>
                                                    </MenuOptions>
                                                </Menu>
                                            </View>
                                        </MenuProvider>
                                    )}
                                </Row>

                                <View style={[spacings.mh5]}>
                                    <NormalText>{recipeData.subtitle}</NormalText>

                                    <Row>
                                        <NormalText>Topic 1</NormalText>
                                        <NormalText>Topic 2</NormalText>
                                        <NormalText>Topic 3</NormalText>
                                    </Row>
                                    
                                    <Line />
                                </View>


                                <InriaTitle>Ingredients</InriaTitle>
                                <View style={[spacings.m4]}>
                                    {recipeData.ingredients.map((item, index) => (
                                        <NormalText key={index} style={{...spacings.mb3}}>
                                            {item}
                                        </NormalText>
                                    ))}
                                </View>

                                <InriaTitle>Step-by-step Guide</InriaTitle>
                                <View style={[spacings.m4]}>
                                    {recipeData.ingredients.map((item, index) => (
                                        <Row>
                                            <TextBold style={{...spacings.mb3, ...spacings.mr2}}>{`Step ${index + 1}`}</TextBold>
                                            <NormalText key={index} style={{...spacings.mb3}}>
                                                {item}
                                            </NormalText>
                                        </Row>
                                    ))}
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    title: {
        zIndex: 1,
        marginBottom: -24,
        borderRadius: 30,
        backgroundColor: '#FFF',
    },
    score: {
        zIndex: 1,
        fontSize: 20,
        marginBottom: -36,
        borderRadius: 30,
        backgroundColor: '#FFF',
    },
    thumbnail: {
        width: '100%',
        height: 300,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    postContent: {
        flex: 1,
        backgroundColor: '#FFF',
        marginTop: -20,
        borderRadius: 24
    },
    avatar: {
        width: 63,
        height: 63,
        borderWidth: 3,
        borderColor: '#B7E0FF',
        borderRadius: '50%',
    },
    sliderContainer: {
        justifyContent: 'space-between',
        marginTop: 15,
        marginHorizontal: 30
    },
    btn: {
        backgroundColor: '#E78F81',
        paddingVertical: 20,
        paddingHorizontal: 28,
        borderRadius: 15,
        boxShadow: '0 2 4 0 rgba(0, 0, 0, 0.25)',
    }
});

const optionsStyles = {
    optionsContainer: {
        backgroundColor: '#FFF',
        marginLeft: 20,
        paddingLeft: 10,
        shadowColor: '#FFF'
    },
};

export default RecipeDetailScreen;