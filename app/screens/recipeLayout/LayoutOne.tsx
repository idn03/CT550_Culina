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
import { Row, Avatar, Line, KuraleTitle, InriaTitle, NormalText, TextBold } from '@/components';

// Other
import { isOwnedCheck, deleteRecipe } from '@/services/api/recipes';
import { Recipe } from '@interfaces/recipe';
import { formatDate } from '@utils/Helper';
import { spacings, shadow } from '@utils/CulinaStyles';
import { StackParamList } from '@navigate/StackNavigator';
import { useGlobalContext } from '@utils/GlobalProvider';


// export const Post

export const Detail = ({ recipeData, score }: { recipeData: Recipe, score: number }) => {
    const navigation: NavigationProp<StackParamList> = useNavigation();
    const [isOwned, setIsOwned] = useState(false);
    const datePost = recipeData ? formatDate(recipeData.$createdAt) : '';
    const recipeId = recipeData.$id ? recipeData.$id : '';
    const { triggerRefresh } = useGlobalContext();

    const ownershipCheck = async () => {
        const check = await isOwnedCheck(recipeData.$id);
        setIsOwned(check);
    };

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
                        <Avatar uri={recipeData.author.avatar} />
                    </Row>

                    <View>
                        <Row>
                            <NormalText>Posted by </NormalText>
                            <TextBold>{recipeData.author.fullname}</TextBold>
                        </Row>
                        <NormalText>{datePost}</NormalText>
                    </View>

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
                    <View style={[spacings.mh8, spacings.mv4]}>
                        {recipeData.ingredients.map((item, index) => (
                            <NormalText key={index} style={{...spacings.mb3}}>
                                {item}
                            </NormalText>
                        ))}
                    </View>

                    <InriaTitle>Step-by-step Guide</InriaTitle>
                    <View style={[spacings.mh8, spacings.mv4]}>
                        {recipeData.ingredients.map((item, index) => (
                            <Row>
                                <TextBold style={{...spacings.mr2}}>
                                    {`Step ${(index + 1).toString()}:`}
                                </TextBold>
                                <NormalText key={index} style={{...spacings.mb3}}>
                                    {item}
                                </NormalText>
                            </Row>
                        ))}
                    </View>

                    {/* Rating, Comment Here */}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
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