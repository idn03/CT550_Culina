// Hooks
import React, { useState, useEffect } from 'react';

// Components
import {
    View,
    StyleSheet,
    Pressable,
    Image,
    Alert,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import {
    Header,
    Row,
    InriaTitle,
    KuraleTitle,
    TextBold,
    NormalText,
    LayoutSelector,
    ImageUploader,
    TopicTag,
    Line,
    Loading
} from '@components/index';
import Author from '@/components/reuse/Author';
import InputIngredients from '@/components/reuse/InputIngredients';
import InputInstructions from '@/components/reuse/InputInstructions';

// Other
import { createRecipe, dummyTopics } from '@services/api/recipes';
import { fetchCurrentUser } from '@services/api/users';
import { useGlobalContext } from '@utils/GlobalProvider';
import { AddRecipeForm } from '@/interfaces/recipe';
import { spacings, shadow } from '@utils/CulinaStyles';

const AddNewRecipe: React.FC = () => {
    const [author, setAuthor] = useState({
        avatar: 'default_avatar.png',
        fullname: '',
    });
    const [imageUri, setImageUri] = useState({ id: 'upload-img', uri: 'https://cdn-icons-png.flaticon.com/128/15781/15781530.png' });
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [form, setForm] = useState<AddRecipeForm>({
        layout: 'horizontal',
        title: '',
        description: '',
        recipeImg: imageUri.id,
        topics: [],
        ingredients: [],
        instructions: [],
    });
    const [loading, setLoading] = useState(true);
    const { triggerRefresh } = useGlobalContext();

    const loadUserInfo = async () => {
        const userFetched = await fetchCurrentUser();
        if (userFetched) {
            setAuthor(userFetched);
        }
        setLoading(false);
    };

    const handleSubmit = async () => {
        if (!form.title || !form.description || form.ingredients.length === 0) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        try {
            console.log(imageUri.id);
            if (imageUri.id == 'upload-img') {
                await createRecipe({
                    title: form.title,
                    layout: form.layout,
                    description: form.description,
                    topics: selectedTopics,
                    ingredients: form.ingredients,
                    instructions: form.instructions,
                    recipeImg: 'https://fra.cloud.appwrite.io/v1/storage/buckets/67a6c19c003620a84cea/files/68502621003bd6f713dd/view?project=67a34d78001b4d38331a&mode=admin'
                });
            }
            else {
                await createRecipe({
                    title: form.title,
                    layout: form.layout,
                    description: form.description,
                    topics: selectedTopics,
                    ingredients: form.ingredients,
                    instructions: form.instructions,
                    recipeImg: imageUri.uri
                });
            }

            setForm({
                layout: 'horizontal',
                title: '',
                description: '',
                recipeImg: imageUri.id,
                topics: [],
                ingredients: [],
                instructions: [],
            });
            setImageUri({ id: 'upload-img', uri: 'https://cdn-icons-png.flaticon.com/128/15781/15781530.png' });
            setSelectedTopics([]);
            Alert.alert("Success", "Recipe added successfully!");
            triggerRefresh();
        } catch (error) {
            Alert.alert("Error", "Failed to add recipe.");
            console.log(error);
        }
    }

    useEffect(() => {
        loadUserInfo();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                <Header>Add New Recipe</Header>
                <Loading />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#FFF' }}>
                <Header>Add New Recipe</Header>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps='handled'
                    nestedScrollEnabled={true}
                >
                    <View style={spacings.p8}>
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
                        <NormalText style={{ textAlign: 'center' }}>If you don't have any photos to illustrate, a system photo will be automatically attached</NormalText>

                        <View style={spacings.mt5}>
                            <Row style={{ justifyContent: 'space-between' }}>
                                <TextInput
                                    value={form.title}
                                    onChangeText={(dn) => setForm({ ...form, title: dn })}
                                    placeholder='Dish Name...'
                                    placeholderTextColor={'#33333350'}
                                    style={styles.inputRecipeTitle}
                                />
                                <KuraleTitle style={{ fontSize: 20 }}>0 / 10</KuraleTitle>
                            </Row>
                        </View>

                        <View style={[spacings.mt3]}>
                            <Author
                                avatar={author.avatar}
                                fullname={author.fullname}
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
                                {loading ? "Sharing..." : "Share new recipe!"}
                            </KuraleTitle>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    layouts: {
        marginLeft: -20,
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    layoutItem: {
        height: 160,
        width: 160,
    },
    uploadImg: {
        width: '100%',
        alignItems: 'center'
    },
    preview: {
        height: 100,
        width: 120,
        borderRadius: 10,
    },
    inputRecipeTitle: {
        fontSize: 32,
        color: '#333',
        maxWidth: 300
    },
});

export default AddNewRecipe;