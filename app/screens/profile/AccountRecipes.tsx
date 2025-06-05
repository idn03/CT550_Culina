import React from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { InriaTitle, Row, Loading, SimplePost } from '@components/index';
import { Recipe } from '@interfaces/recipe';
import { spacings, shadow } from '@utils/CulinaStyles';

interface AccountRecipesProps {
    recipes: Recipe[];
    loading: boolean;
    selected: string;
    setSelected: (value: string) => void;
}

const AccountRecipes: React.FC<AccountRecipesProps> = ({ recipes, loading, selected, setSelected }) => {
    return (
        <View style={{ flex: 1 }}>
            <Row style={{ justifyContent: 'space-evenly', marginBottom: 10 }}>
                <Pressable onPress={() => setSelected('l')}>
                    <InriaTitle
                        style={{
                            opacity: selected === 'l' ? 1 : 0.6,
                            fontSize: selected === 'l' ? 28 : 22,
                            ...(selected === 'l' ? shadow.textShadow : {}),
                        }}
                    >Your Recipes</InriaTitle>
                </Pressable>

                <Pressable onPress={() => setSelected('r')}>
                    <InriaTitle
                        style={{
                            opacity: selected === 'r' ? 1 : 0.6,
                            fontSize: selected === 'r' ? 28 : 22,
                            ...(selected === 'r' ? shadow.textShadow : {}),
                        }}
                    >Saved Recipes</InriaTitle>
                </Pressable>
            </Row>

            { loading && recipes.length === 0 ? (
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

            {/* <View style={[spacings.m15]}></View> */}
        </View>
    );
}

export default AccountRecipes;