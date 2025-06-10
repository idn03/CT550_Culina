import React from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { InriaTitle, Row, Loading, SimplePost } from '@components/index';
import { Recipe } from '@interfaces/recipe';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { spacings, shadow } from '@utils/CulinaStyles';
import { useGlobalContext } from '@utils/GlobalProvider';

interface AccountRecipesProps {
    recipes: Recipe[];
    loading: boolean;
    selected: string;
    setSelected: (value: string) => void;
}

const AccountRecipes: React.FC<AccountRecipesProps> = ({ recipes, loading, selected, setSelected }) => {
    const { triggerRefresh } = useGlobalContext();

    return (
        <View style={{ flex: 1 }}>
            <Row style={{ justifyContent: 'space-evenly', marginBottom: 10 }}>
                <Pressable onPress={() => setSelected('l')}>
                    <InriaTitle
                        style={{
                            opacity: selected === 'l' ? 1 : 0.6,
                            fontSize: selected === 'l' ? 24 : 20,
                            ...(selected === 'l' ? shadow.textShadow : {}),
                        }}
                    >Your Recipes</InriaTitle>
                </Pressable>

                <Pressable onPress={() => setSelected('r')}>
                    <InriaTitle
                        style={{
                            opacity: selected === 'r' ? 1 : 0.6,
                            fontSize: selected === 'r' ? 24 : 20,
                            ...(selected === 'r' ? shadow.textShadow : {}),
                        }}
                    >Saved Recipes</InriaTitle>
                </Pressable>
                <Pressable style={spacings.mt1} onPress={triggerRefresh}>
                    <MaterialCommunityIcons name="reload" size={24} color="#333" />
                </Pressable>
            </Row>

            {loading && recipes.length === 0 ? (
                <Loading />
            ) : (
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.$id}
                    renderItem={({ item }) => (
                        <SimplePost
                            $id={item.$id}
                            title={item.title}
                            description={item.description}
                            topics={item.topics}
                            $createdAt={item.$createdAt}
                        />
                    )}
                />
            )}

            <View style={[spacings.m15]}></View>
        </View>
    );
}

export default AccountRecipes;