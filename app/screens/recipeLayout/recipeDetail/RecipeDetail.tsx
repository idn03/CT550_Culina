// Hooks
import { useState, useEffect } from 'react';

// Components
import {
    View,
    StyleSheet
} from 'react-native';
import {
    StackHeader,
    Loading
} from '@components/index';
import { LayoutOneDetail } from '../LayoutOne';

// Other
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from '@navigate/StackNavigator';
import { isOwnedCheck, fetchRecipeDetail, getRecipeScore } from '@services/api/recipes';
import { Recipe } from '@interfaces/recipe';
import { useGlobalContext } from '@utils/GlobalProvider';

type RecipeDetailScreenRouteProp = RouteProp<StackParamList, 'RecipeDetail'>;

const RecipeDetailScreen = ({ route }: { route: RecipeDetailScreenRouteProp }) => {
    const { recipeId } = route.params;
    const [recipeData, setRecipeData] = useState<Recipe>();
    const [isOwned, setIsOwned] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const { refresh } = useGlobalContext();

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
                recipeData.layout === 'one' ? (
                    <LayoutOneDetail 
                        recipeData={recipeData}
                        score={score}
                        isOwned={isOwned}
                    />
                ) : (
                    <View></View>
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
});

export default RecipeDetailScreen;