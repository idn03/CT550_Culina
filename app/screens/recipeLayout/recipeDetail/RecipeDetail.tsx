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
} from '@/components';
import { LayoutOneDetail } from '../LayoutOne';
import { LayoutTwoDetail } from '../LayoutTwo';
import RnS from './RnS';
import Comments from './Comments';

// Other
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from '@navigate/StackNavigator';
import { isOwnedCheck, fetchRecipeDetail, getRecipeScore } from '@services/api/recipes';
import { fetchCurrentUser } from '@/services/api/users';
import { Recipe } from '@interfaces/recipe';
import { SimpleUser } from '@/interfaces/user';
import { useGlobalContext } from '@utils/GlobalProvider';
import { spacings } from '@/utils/CulinaStyles';

type RecipeDetailScreenRouteProp = RouteProp<StackParamList, 'RecipeDetail'>;

const RecipeDetailScreen = ({ route }: { route: RecipeDetailScreenRouteProp }) => {
    const { recipeId } = route.params;
    const [recipeData, setRecipeData] = useState<Recipe>();
    const [isOwned, setIsOwned] = useState(false);
    const [score, setScore] = useState(0);
    const [currentUser, setCurrentUser] = useState<SimpleUser>();
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

        const loadCurrentUser = async () => {
            try {
                const result = await fetchCurrentUser();

                setCurrentUser({
                    $id: result.$id,
                    avatar: result.avatar,
                    fullname: result.fullname
                });
            }
            catch (error) {
                console.error(error);
            }
        }

        loadRecipeDetail();
        loadScore();
        ownershipCheck();
        loadCurrentUser();
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
                recipeData.layout === 'horizontal' ? (
                    <LayoutOneDetail
                        recipeData={recipeData}
                        score={score}
                        isOwned={isOwned}
                    >
                        <RnS recipeId={recipeData.$id} />

                        <Comments 
                            recipeId={recipeData.$id} 
                            avatar={currentUser?.avatar ?? ''} 
                            userId={currentUser?.$id ?? ''} 
                        />
                    </LayoutOneDetail>
                ) : (
                    <LayoutTwoDetail
                        recipeData={recipeData}
                        score={score}
                        isOwned={isOwned}
                    >
                        <RnS recipeId={recipeData.$id} />

                        <Comments 
                            recipeId={recipeData.$id} 
                            avatar={currentUser?.avatar ?? ''} 
                            userId={currentUser?.$id ?? ''} 
                        />
                    </LayoutTwoDetail>
                ))
            }

            <View style={spacings.mv5}></View>
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