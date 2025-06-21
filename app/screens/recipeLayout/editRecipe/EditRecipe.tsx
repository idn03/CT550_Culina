// Hooks
import React, { useState, useEffect } from 'react';

// Components
import {
    View,
    StyleSheet,
    Pressable,
    ScrollView,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import {
    StackHeader,
    Row,
    TextBold,
    InriaTitle,
    KuraleTitle,
    LayoutSelector,
    ImageUploader,
    Author,
    InputIngredients,
    InputInstructions,
    TopicTag,
    Line,
    Loading
} from '@/components';

// Other
import { RouteProp } from '@react-navigation/native';
import { getCurrentDate } from '@utils/Helper';
import { StackParamList } from '@navigate/StackNavigator';
import { fetchRecipeDetail, editRecipe } from '@services/api/recipes';
import { fetchCurrentUser } from '@services/api/users';
import { useGlobalContext } from '@utils/GlobalProvider';
import { dummyTopics } from '@services/api/recipes';
import { spacings, shadow } from '@utils/CulinaStyles';

type EditRecipeScreenRouteProp = RouteProp<StackParamList, 'EditRecipe'>;

const EditRecipeScreen = ({ route }: { route: EditRecipeScreenRouteProp }) => {
    const { recipeId } = route.params;
    const [user, setUserFetched] = useState({
        $id: '',
        avatar: 'default_avatar.png',
        fullname: '',
    });
    const [imageUri, setImageUri] = useState({ id: '1', uri: 'https://cdn-icons-png.flaticon.com/128/15781/15781530.png' });
    const [form, setForm] = useState({
        layout: 'horizontal',
        title: '',
        description: '',
        ingredients: [] as string[],
        instructions: [] as string[]
    });
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { triggerRefresh } = useGlobalContext();

    const loadUserInfo = async () => {
        const userFetched = await fetchCurrentUser();
        if (userFetched) {
            setUserFetched(userFetched);
        }
    };

    const loadRecipeDetail = async () => {
        const recipeData = await fetchRecipeDetail(recipeId);
        if (recipeData) {
            setForm({
                layout: recipeData.layout || 'horizontal',
                title: recipeData.title || '',
                description: recipeData.description || '',
                ingredients: recipeData.ingredients || [],
                instructions: recipeData.instructions || [],
            });
            setImageUri({ id: '0', uri: recipeData.recipeImg });
            setSelectedTopics(recipeData.topics);
        }
    }

    const handleSubmit = async () => {
        try {
            const updated = await editRecipe({
                $id: recipeId,
                title: form.title,
                description: form.description,
                ingredients: form.ingredients,
                instructions: form.instructions,
                author: user,
                recipeImg: imageUri.uri,
                layout: form.layout,
                topics: selectedTopics,
                $createdAt: getCurrentDate(),
            });

            if (updated) {
                Alert.alert('Success', 'Recipe updated successfully.');
            }
            else {
                console.log('hehe');
            }
            triggerRefresh();
        }
        catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to edit recipe.');
        }
    }

    useEffect(() => {
        try {
            setLoading(true);
            loadUserInfo();
            loadRecipeDetail();
        }
        catch (error) {
            console.error(error);
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    }, []);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <View style={styles.container}>
                <StackHeader>Edit Recipe</StackHeader>

                {loading ? (
                    <Loading />
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps='handled'
                        nestedScrollEnabled={true}
                    >
                        <View style={spacings.m8}>
                            <InriaTitle>Choose Layout</InriaTitle>

                            <LayoutSelector
                                selectedLayout={form.layout}
                                onLayoutSelect={(selected) => {
                                    setForm({ ...form, layout: selected });
                                }}
                            />

                            <ImageUploader
                                imageUri={imageUri}
                                setImageUri={setImageUri}
                                layout={form.layout}
                            />

                            <View style={spacings.mt5}>
                                <TextInput
                                    value={form.title}
                                    onChangeText={(dn) => setForm({ ...form, title: dn })}
                                    placeholder='Dish Name...'
                                    placeholderTextColor={'#33333350'}
                                    style={styles.inputRecipeTitle}
                                />
                            </View>

                            <View style={[spacings.mt3]}>
                                <Author
                                    avatar={user.avatar}
                                    fullname={user.fullname}
                                />
                            </View>

                            <View style={[spacings.mt3, spacings.mh8]}>
                                <TextInput
                                    value={form.description}
                                    onChangeText={(des) => setForm({ ...form, description: des })}
                                    placeholder='Type description here...'
                                    placeholderTextColor={'#33333350'}
                                    style={[spacings.pt2, { color: '#333' }]}
                                />
                            </View>

                            <Row style={{ ...spacings.mt3, ...spacings.mh3 }}>
                                <TextBold>Topics</TextBold>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={spacings.ml3}
                                >
                                    {dummyTopics.map((topic, index) => (
                                        <TopicTag
                                            key={index}
                                            topic={topic.title}
                                            selected={selectedTopics.includes(topic.title)}
                                            onPress={() => {
                                                setSelectedTopics(prev => {
                                                    if (prev.includes(topic.title)) {
                                                        return prev.filter(t => t !== topic.title);
                                                    }
                                                    return [...prev, topic.title];
                                                });
                                            }}
                                        />
                                    ))}
                                </ScrollView>
                            </Row>

                            <Line />

                            <View>
                                <InriaTitle>Ingredients</InriaTitle>
                                <InputIngredients
                                    ingredients={form.ingredients}
                                    setIngredients={(ingredients) => setForm({ ...form, ingredients })}
                                />
                            </View>

                            <View>
                                <InriaTitle>Instructions</InriaTitle>
                                <InputInstructions
                                    instructions={form.instructions}
                                    setInstructions={(instructions) => setForm({ ...form, instructions })}
                                />
                            </View>

                            <Pressable
                                onPress={() => { !loading && handleSubmit(); }}
                                disabled={loading}
                            >
                                <KuraleTitle style={{ ...spacings.mb20, ...shadow.textShadow, alignSelf: 'flex-end' }}>
                                    {loading ? "Saving..." : "Save Change!"}
                                </KuraleTitle>
                            </Pressable>
                        </View>
                    </ScrollView>
                )}
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    inputRecipeTitle: {
        fontSize: 32,
        color: '#333',
        maxWidth: 300
    },
});

export default EditRecipeScreen;