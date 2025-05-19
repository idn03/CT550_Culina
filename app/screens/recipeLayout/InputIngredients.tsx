import React, { useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {View, StyleSheet, TextInput, Pressable, ScrollView} from 'react-native';
import { TextBold, NormalText, Row } from "@components/index";
import { spacings, shadow } from "@utils/CulinaStyles";

interface InputIngredientsProps {
    ingredients: string[];
    setIngredients: (ingredients: string[]) => void;
}

const InputIngredients: React.FC<InputIngredientsProps> = ({ ingredients, setIngredients }) => {
    const [item, setItem] = useState("");

    const handleAddIngredient = () => {
        if (item.trim() !== "") {
            setIngredients([...ingredients, item.trim()]);
            setItem("");
        }
    };

    const handleRemoveIngredient = (index: number) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
    };
    
    return (
        <View>
            <View style={{position: 'relative'}}>
                <TextInput 
                    placeholder='Type ingredient here' 
                    placeholderTextColor={'#33333380'}
                    maxLength={30}
                    style={[styles.inputBar, spacings.m5, spacings.ph4, spacings.pv6]}
                    value={item}
                    onChangeText={setItem}
                />

                <Pressable 
                    style={[styles.inputBtn, spacings.pv4, spacings.ph6, shadow.boxShadow]} 
                    onPress={handleAddIngredient}
                >
                    <TextBold style={{fontSize: 20}}>+</TextBold>
                </Pressable>
            </View>

            <ScrollView style={[spacings.mv1, spacings.mh5]}>
                {ingredients.map((item, index) => (
                    <Row key={index} style={{...styles.ingredientItem, ...spacings.mt1, ...spacings.p2}}>
                        <NormalText>{item}</NormalText>
                        <Pressable onPress={() => handleRemoveIngredient(index)}>
                        <FontAwesome name="trash" size={20} color="#333" />
                        </Pressable>
                    </Row>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    inputBar: {
        borderColor: '#33333325',
        borderWidth: 1,
        borderRadius: 36,
    },
    inputBtn: {
        position: 'absolute',
        right: 30,
        top: 28,
        backgroundColor: '#B7E0FF',
        borderRadius: 30,
    },
    ingredientItem: {
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default InputIngredients;