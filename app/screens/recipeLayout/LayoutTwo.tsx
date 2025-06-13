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

export const LayoutTwoPost: React.FC<RecipePostInfo> = ({ seq, recipeId, author, datePost, recipeImg, title, description }) => {
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
            <View>
                <Row style={spacings.ml3}>
                    <Avatar size={63} uri={author.avatar} />
                    <Row style={{ ...spacings.mb3, ...spacings.ml2 }}>
                        <NormalText>Posted by </NormalText>
                        <TextBold>{author.fullname}</TextBold>
                    </Row>
                </Row>

                <Row style={{ marginTop: -24 }}>
                    <Image source={{ uri: recipeImg }} style={[styles.postThumbnail, shadow.boxShadow]} />

                    <View>
                        <KuraleTitle style={{ ...styles.postText, ...shadow.textShadow }}>{title}</KuraleTitle>
                        <Row style={{ justifyContent: 'space-between' }}>
                            <NormalText style={spacings.mb3}>{datePostFormated}</NormalText>
                            <KuraleTitle style={{ ...styles.postText, fontSize: 20 }}>{`${score} / 10`}</KuraleTitle>
                        </Row>
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
        <View style={{ flex: 1 }}>
            <KuraleTitle
                style={{
                    ...styles.title,
                    ...spacings.pv3,
                    ...spacings.ph5
                }}
            >{recipeData.title}</KuraleTitle>

            <Row>
                <Image source={{ uri: recipeData?.recipeImg }} style={styles.thumbnail} />
                <View>
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

                    
                </View>
            </Row>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 460,
    },
    postThumbnail: {
        width: '100%',
        height: 250,
        borderRadius: 15,
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
    thumbnail: {
        width: 300,
        height: '100%',
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
    },
});