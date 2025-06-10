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
    Pressable,
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
    Row,
    Avatar,
    TopicTag,
    Line,
    KuraleTitle,
    InriaTitle,
    NormalText,
    TextBold
} from '@/components';

// Other
import { deleteRecipe } from '@/services/api/recipes';
import { Recipe, RecipePostInfo } from '@interfaces/recipe';
import { formatDate } from '@utils/Helper';
import { StackParamList } from '@navigate/StackNavigator';
import { getRecipeScore } from '@services/api/recipes';
import { useGlobalContext } from '@utils/GlobalProvider';
import { spacings, shadow } from '@utils/CulinaStyles';


export const LayoutOnePost: React.FC<RecipePostInfo> = ({ seq, recipeId, author, datePost, recipeImg, title, description }) => {
    const navigation: NavigationProp<StackParamList> = useNavigation();
    const [score, setScore] = useState(0);
    const datePostFormated = formatDate(datePost);

    useEffect(() => {
        const loadScore = async () => {
            try {
                const result = await getRecipeScore(recipeId);
                setScore(result ? parseFloat(result.toFixed(1)) : 0);
            }
            catch (error) {
                console.error(error);
            }
        }

        loadScore();
    }, []);

    return (
        <Pressable
            style={[styles.container, spacings[`mt${seq + 18}`], spacings.mb18]}
            onPress={() => navigation.navigate('RecipeDetail', { recipeId })}
        >
            <Row style={{ ...styles.postHeader, ...spacings.mh5 }}>
                <Row>
                    <Avatar size={63} uri={author.avatar} />
                    <Row style={{ ...spacings.mb3, ...spacings.ml2 }}>
                        <NormalText>Posted by </NormalText>
                        <TextBold>{author.fullname}</TextBold>
                    </Row>
                </Row>
                <NormalText style={spacings.mb3}>{datePostFormated}</NormalText>
            </Row>
            <Image source={{ uri: recipeImg }} style={[styles.postThumbnail, shadow.boxShadow]} />

            <KuraleTitle style={{ ...styles.postText, ...shadow.textShadow }}>{title}</KuraleTitle>
            <KuraleTitle style={{ ...styles.postText, fontSize: 20 }}>{`${score} / 10`}</KuraleTitle>
            <TextBold style={styles.postText}>Description:</TextBold>
            <NormalText style={styles.postText}>{description}</NormalText>
        </Pressable>
    );
};

export const LayoutOneDetail: React.FC<{
    recipeData: Recipe;
    score: number;
    isOwned: boolean;
    children?: React.ReactNode;
}> = ({ recipeData, score, isOwned, children }) => {
    const navigation: NavigationProp<StackParamList> = useNavigation();
    const datePost = recipeData ? formatDate(recipeData.$createdAt) : '';
    const recipeId = recipeData.$id ? recipeData.$id : '';
    const { triggerRefresh } = useGlobalContext();

    return (
        <View style={{ flex: 1 }}>
            <Row style={{ justifyContent: 'space-between', ...spacings.ph8 }}>
                <KuraleTitle style={{ ...styles.title, ...spacings.pv3, ...spacings.ph5 }}>{recipeData.title}</KuraleTitle>
                <KuraleTitle style={{ ...styles.score, ...spacings.p3 }}>{`${score} / 10`}</KuraleTitle>
            </Row>
            <Image source={{ uri: recipeData?.recipeImg }} style={styles.thumbnail} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={[styles.postContent, shadow.boxShadowTop]}
            >
                <View style={[spacings.pv5, spacings.ph8]}>
                    <Row style={{ justifyContent: 'space-between', ...spacings.mv3 }}>
                        <Row>
                            <Avatar uri={recipeData.author.avatar} />
                            <View>
                                <Row>
                                    <NormalText>Posted by </NormalText>
                                    <TextBold>{recipeData.author.fullname}</TextBold>
                                </Row>
                                <NormalText>{datePost}</NormalText>
                            </View>
                        </Row>

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
                        <NormalText>{recipeData.description}</NormalText>

                        <Row style={{ ...spacings.mt2, flexWrap: 'wrap' }}>
                            {recipeData.topics.map((topic, index) => (
                                <TopicTag key={index} topic={topic} />
                            ))}
                        </Row>

                    </View>
                    <Line style={{ ...spacings.mh5 }} />

                    <InriaTitle>Ingredients</InriaTitle>
                    <View style={[spacings.mh8, spacings.mv4]}>
                        {recipeData.ingredients.map((item, index) => (
                            <NormalText key={`ingredient-${index}`} style={{ ...spacings.mb3 }}>
                                {item}
                            </NormalText>
                        ))}
                    </View>

                    <InriaTitle>Step-by-step Guide</InriaTitle>
                    <View style={[spacings.mh8, spacings.mv4]}>
                        {recipeData.instructions.map((item, index) => (
                            <Row key={`step-${index}`} style={spacings.mb3}>
                                <TextBold style={{ ...spacings.mr2 }}>
                                    {`Step ${(index + 1).toString()}:`}
                                </TextBold>
                                <NormalText key={index}>
                                    {item}
                                </NormalText>
                            </Row>
                        ))}
                    </View>


                    <Line style={{ ...spacings.mh5 }} />
                    
                    {children}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 460,
    },
    postHeader: {
        zIndex: 1,
        justifyContent: 'space-between',
    },
    postThumbnail: {
        width: '100%',
        height: 250,
        marginTop: -24,
        borderRadius: 16,
    },
    postText: {
        marginBottom: 10,
        textAlign: 'center',
    },
    title: {
        zIndex: 1,
        marginBottom: -24,
        borderRadius: 32,
        backgroundColor: '#FFF',
    },
    score: {
        zIndex: 1,
        fontSize: 20,
        marginBottom: -36,
        borderRadius: 32,
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
        borderRadius: 24,
    },
});

const optionsStyles = {
    optionsContainer: {
        backgroundColor: '#FFF',
        marginLeft: 20,
        paddingLeft: 10,
        shadowColor: '#FFF'
    },
};