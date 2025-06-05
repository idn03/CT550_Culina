// Hooks
import React, { useState, useEffect } from 'react';
import {
    NavigationProp,
    useNavigation,
} from '@react-navigation/native';

// Components
import { View, StyleSheet, Pressable } from 'react-native';
import Row from './Row';
import TopicTag from './TopicTag';
import KuraleTitle from './KuraleTitle';
import TextBold from '../override/TextBold';
import NormalText from '../override/Text';

// Other
import { SimpleRecipe } from '@interfaces/recipe';
import { getRecipeScore } from '@/services/api/recipes';
import { formatDate } from '@/utils/Helper';
import { StackParamList } from '@/navigate/StackNavigator';
import { spacings } from '@/utils/CulinaStyles';

const SimplePost: React.FC<SimpleRecipe> = ({ $id, title, description, topics, $createdAt }) => {
    const navigation: NavigationProp<StackParamList> = useNavigation();
    const [score, setScore] = useState(0);
    const datePostFormated = formatDate($createdAt);

    useEffect(() => {
        const loadScore = async () => {
            try {
                const result = await getRecipeScore($id);

                setScore(result ? parseFloat(result.toFixed(1)) : 0);
            }
            catch (error) {
                console.error(error);
            }
        }

        loadScore();
    }, []);

    return (
        <Pressable onPress={() => navigation.navigate('RecipeDetail', { recipeId: $id })} style={[spacings.mt5, spacings.mb10]}>
            <KuraleTitle>{title}</KuraleTitle>
            <Row style={{ ...spacings.mr5, justifyContent: 'space-between' }}>
                <KuraleTitle style={{ ...styles.postText, fontSize: 20 }}>{`${score} / 10`}</KuraleTitle>
                <NormalText style={styles.postText}>{datePostFormated}</NormalText>
            </Row>

            <View>
                <Row>
                    <TextBold>Description:</TextBold>
                    <NormalText style={{ ...spacings.ml2, width: 280 }}>{description}</NormalText>
                </Row>
            </View>

            <Row style={{...spacings.mt2, flexWrap: 'wrap'}}>
                {topics.map((topic, index) => (
                    <TopicTag key={index} topic={topic} />
                ))}
            </Row>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    postText: {
        marginBottom: 10,
        textAlign: 'left',
    }
});

export default SimplePost;