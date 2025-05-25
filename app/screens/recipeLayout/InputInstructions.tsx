import React, { useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { TextBold, NormalText, Row } from "@components/index";
import { spacings, shadow } from "@utils/CulinaStyles";

interface InputInstructionsProps {
    instructions: string[];
    setInstructions: (instructions: string[]) => void;
}

const InputInstructions: React.FC<InputInstructionsProps> = ({ instructions, setInstructions }) => {
    const [item, setItem] = useState("");

    const addItem = () => {
        if (item.trim() !== "") {
            setInstructions([...instructions, item.trim()]);
            setItem("");
        }
    };

    const removeItem = (index: number) => {
        const updatedInstructions = instructions.filter((_, i) => i !== index);
        setInstructions(updatedInstructions);
    };

    return (
        <View>
            <View style={{position: 'relative'}}>
                <TextInput 
                    placeholder='Type instruction here' 
                    placeholderTextColor={'#33333380'}
                    maxLength={30}
                    style={[styles.inputBar, spacings.m5, spacings.ph4, spacings.pv6]}
                    value={item}
                    onChangeText={setItem}
                />

                <Pressable 
                    style={[styles.inputBtn, spacings.p2]} 
                    onPress={addItem}
                >
                    <TextBold style={{fontSize: 28}}>+</TextBold>
                </Pressable>
            </View>

            <ScrollView style={[spacings.mv1, spacings.mh5]}>
                {instructions.map((item, index) => (
                    <Row key={index} style={{...styles.instructionItem, ...spacings.mt1, ...spacings.p2}}>
                        <NormalText>{item}</NormalText>
                        <Pressable onPress={() => removeItem(index)}>
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
        right: 36,
        top: 28,
        borderRadius: 30,
    },
    instructionItem: {
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default InputInstructions;