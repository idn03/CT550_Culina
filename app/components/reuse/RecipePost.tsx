// Hooks
import React, {useState, useEffect} from 'react';
import {
    NavigationProp,
    useNavigation,
} from '@react-navigation/native';
import { StyleSheet, Pressable, Image } from 'react-native';
import { KuraleTitle, NormalText, Row, TextBold } from '@components/index';
import { StackParamList } from '@navigate/StackNavigator';
import { getRecipeScore } from '@services/api/recipes';
import { formatDate } from '@utils/Helper';
import { spacings, shadow } from '@utils/CulinaStyles';
import { RecipePostInfo } from '@interfaces/recipe';

const RecipePost: React.FC<RecipePostInfo> = ({ seq, recipeId, author, datePost, recipeImg, title, description }) => {
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
            <Row style={{...styles.postHeader, ...spacings.mh5}}>
                <Row>
                    <Image source={{uri: author.avatar}} style={[styles.postAvatar, spacings.mr2]} />
                    <Row style={spacings.mb3}>
                        <NormalText>Posted by </NormalText>
                        <TextBold>{author.fullname}</TextBold>
                    </Row>
                </Row>
                <NormalText style={spacings.mb3}>{datePostFormated}</NormalText>
            </Row>
            <Image source={{uri: recipeImg}} style={[styles.postThumbnail, shadow.boxShadow]} />
            
            <KuraleTitle style={styles.postText}>{title}</KuraleTitle>
            <KuraleTitle style={{...styles.postText, fontSize: 20}}>{`${score} / 10`}</KuraleTitle>
            <TextBold style={styles.postText}>Description:</TextBold>
            <NormalText style={styles.postText}>{description}</NormalText>
        </Pressable>
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
    postAvatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderColor: '#B7E0FF',
        borderRadius: '50%',
    },
    postThumbnail: {
        width: '100%',
        height: 250,
        marginTop: -25,
        borderRadius: 15,
    },
    postText: {
        marginBottom: 10,
        textAlign: 'center',
    }
});

export default React.memo(RecipePost);