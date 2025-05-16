import React, {useState, useEffect} from 'react';
import {
    NavigationProp,
    useNavigation,
} from '@react-navigation/native';
import { StyleSheet, Pressable, Image } from 'react-native';
import { KuraleTitle, NormalText, Row, TextBold } from './../../components';
import { StackParamList } from './../../navigate/StackNavigator';
import { getRecipeScore } from './../../services/api/recipes';
import { formatDate } from './../../utils/Helper';
import { spacings, shadow } from './../../utils/CulinaStyles';

export interface RecipePostProps {
    recipeId: string;
    avatar: string;
    author: string;
    datePost: string;
    thumbnail: string;
    title: string;
    subtitle: string;
}

const RecipePost: React.FC<RecipePostProps> = ({ recipeId, avatar, author, datePost, thumbnail, title, subtitle }) => {
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
            style={[styles.container, spacings.mt15, spacings.mb18]} 
            onPress={() => navigation.navigate('RecipeDetail', { recipeId })}
        >
            <Row style={{...styles.postHeader, ...spacings.mh5}}>
                <Row>
                    <Image source={{uri: avatar}} style={[styles.postAvatar, spacings.mr2]} />
                    <Row style={spacings.mb3}>
                        <NormalText>Posted by </NormalText>
                        <TextBold>{author}</TextBold>
                    </Row>
                </Row>
                <NormalText style={spacings.mb3}>{datePostFormated}</NormalText>
            </Row>
            <Image source={{uri: thumbnail}} style={[styles.postThumbnail, shadow.boxShadow]} />
            
            <KuraleTitle style={styles.postText}>{title}</KuraleTitle>
            <KuraleTitle style={{...styles.postText, fontSize: 20}}>{`${score} / 10`}</KuraleTitle>
            <TextBold style={styles.postText}>Description:</TextBold>
            <NormalText style={styles.postText}>{subtitle}</NormalText>
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