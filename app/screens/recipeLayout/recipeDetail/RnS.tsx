import React, { useState, useEffect } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import Slider from '@react-native-community/slider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Row, TextBold, InriaTitle } from '@components/index';
import { saveRecipe, unsaveRecipe, saveRecipeCheck, ratingRecipe } from '@services/api/recipes';
import { useGlobalContext } from '@utils/GlobalProvider';
import { shadow, spacings } from '@/utils/CulinaStyles';

interface RnSProps {
    recipeId: string;
}

const RnS: React.FC<RnSProps> = ({ recipeId }) => {
    const [score, setScore] = useState(5);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const { triggerRefresh } = useGlobalContext();

    const loadSaveState = async () => {
        try {
            const response = await saveRecipeCheck(recipeId);
            setIsSaved(response ?? false);
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleRating = async () => {
        try {
            await ratingRecipe(recipeId, score);
        }
        catch (error) {
            console.error(error);
        }
        triggerRefresh();
    }

    const handleSaveRecipe = async () => {
        setLoading(true);
        try {
            const savedRecipe = await saveRecipe(recipeId);

            if (savedRecipe) {
                setIsSaved(true);
            }
            setLoading(false);
            triggerRefresh();
        }
        catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleUnsaveRecipe = async () => {
        setLoading(true);
        try {
            const response = await unsaveRecipe(recipeId);

            if (response) {
                setIsSaved(false);
            }
            setLoading(false);
            triggerRefresh();
        }
        catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        loadSaveState();
    }, []);

    return (
        <>
            <InriaTitle>Rating This Recipe</InriaTitle>
            <Row style={{...styles.container, ...spacings.mv4}}>
                <View style={{ alignItems: 'center' }}>
                    <TextBold style={{...spacings.mb2}}>Score</TextBold>
                    <InriaTitle>{score.toFixed(1)}</InriaTitle>
                </View>

                <View>
                    <Slider
                        style={{ width: 200, height: 20 }}
                        minimumValue={0}
                        maximumValue={10}
                        step={0.1}
                        minimumTrackTintColor="#FFCFB3"
                        maximumTrackTintColor="#33333360"
                        thumbTintColor="#FFCFB3"
                        value={score}
                        onValueChange={setScore}
                    />

                    <Row style={{ ...spacings.mt2 }}>
                        <Pressable
                            onPress={() => { !loading && handleRating() }}
                            disabled={loading}
                        >
                            <Row style={{ ...styles.ratingBtn, ...spacings.p3 }}>
                                <AntDesign name="hearto" size={18} color="#333" style={[spacings.mr2]} />
                                <TextBold>Rating</TextBold>
                            </Row>
                        </Pressable>

                        {!isSaved ? (
                            <Pressable 
                                style={{ ...styles.savingBtn, ...spacings.p3, ...spacings.ml3 }} 
                                onPress={() => { !loading && handleSaveRecipe() }} 
                                disabled={loading}
                            >
                                <MaterialIcons name="bookmark-border" size={18} color="#333" />
                            </Pressable>
                        ) : (
                            <Pressable
                                style={{ ...styles.savingBtn, ...spacings.p3, ...spacings.ml3 }}
                                onPress={() => { !loading && handleUnsaveRecipe() }}
                                disabled={loading}
                            >
                                <MaterialIcons name="bookmark" size={18} color="#333" />
                            </Pressable>
                        )}
                    </Row>
                </View>
            </Row>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around'
    },
    ratingBtn: {
        backgroundColor: '#FFCFB3',
        borderRadius: 8,
    },
    savingBtn: {
        borderColor: '#33333325',
        borderWidth: 1,
        borderRadius: 8,
    },
});

export default RnS;