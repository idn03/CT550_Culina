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

export const LayoutTwoPost: React.FC<RecipePostInfo> = ({ recipeId, author, datePost, recipeImg, title, description }) => {
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
            style={[styles.container, spacings.mv15]}
            onPress={() => navigation.navigate('RecipeDetail', { recipeId })}
        >
            <View>
                <Row style={{ ...styles.postHeader, ...spacings.mh5 }}>
                    <Row>
                        <Avatar size={63} uri={author.avatar} />
                        <Row style={spacings.mb3}>
                            <NormalText>Posted by </NormalText>
                            <TextBold>{author.fullname}</TextBold>
                        </Row>
                    </Row>
                    <NormalText style={spacings.mb3}>{datePostFormated}</NormalText>
                </Row>

                <Row style={{ marginTop: -24 }}>
                    <Image source={{ uri: recipeImg }} style={[styles.postThumbnail, shadow.boxShadow]} />

                    <View style={[styles.postContent, spacings.mt3, spacings.ph3]}>
                        <KuraleTitle style={{ ...spacings.mb6, ...shadow.textShadow }}>{title}</KuraleTitle>
                        <KuraleTitle style={{ ...styles.postText, fontSize: 20 }}>{`${score} / 10`}</KuraleTitle>
                        <TextBold style={styles.postText}>Description:</TextBold>
                        <NormalText style={styles.postText}>{description}</NormalText>
                    </View>
                </Row>
            </View>
        </Pressable>
    );
}

export const LayoutTwoDetail: React.FC<{
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
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <Row>
                <KuraleTitle
                    style={{
                        ...styles.title,
                        ...spacings.pv3,
                        ...spacings.ph5
                    }}
                >{recipeData.title}</KuraleTitle>
                {isOwned && (
                    <MenuProvider style={{ alignSelf: 'flex-end' }}>
                        <View style={[spacings.p5]}>
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

            <Row>
                <Image source={{ uri: recipeData?.recipeImg }} style={styles.thumbnail} />
                <View>
                    <View style={{ justifyContent: 'space-around', flex: 1 }}>
                        <View style={{ alignItems: 'center', minWidth: 180 }}>
                            <Avatar uri={recipeData.author.avatar} />
                            <TextBold>{recipeData.author.fullname}</TextBold>
                            <NormalText style={{ alignSelf: 'center' }}>{datePost}</NormalText>
                        </View>
                        <KuraleTitle style={{ ...styles.postText, fontSize: 20 }}>{`${score} / 10`}</KuraleTitle>

                        <View style={{ alignItems: 'center' }}>
                            {recipeData.topics.map((topic, index) => (
                                <TopicTag key={index} topic={topic} />
                            ))}
                        </View>
                    </View>
                </View>
            </Row>

            <View style={[spacings.mh8, spacings.mv5]}>
                <NormalText>{recipeData.description}</NormalText>

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
    );
}

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
        width: '56%',
        height: 360,
        borderRadius: 15,
    },
    postContent: {
        maxWidth: '44%',
        alignSelf: 'flex-start'
    },
    postText: {
        marginBottom: 10,
        textAlign: 'center',
    },
    title: {
        zIndex: 1,
    },
    thumbnail: {
        width: '56%',
        height: 360,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
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