import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { spacings, shadow } from '@utils/CulinaStyles';

interface InputBarProps {
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    showPassword?: boolean;
    setShowPassword?: (show: boolean) => void;
}

const InputBar: React.FC<InputBarProps> = ({ value, onChangeText, secureTextEntry = false, showPassword = false, setShowPassword }) => {
    return (
        <View style={[styles.inputContainer, spacings.mt1, shadow.boxShadow]}>
            <TextInput
                style={[styles.inputBar, spacings.ph3, spacings.pv4]}
                maxLength={100}
                placeholderTextColor='#333'
                underlineColorAndroid='transparent'
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry && !showPassword}
            />
            {secureTextEntry && (
                <TouchableOpacity onPress={() => setShowPassword && setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#333" style={{marginRight: 12}} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF60',
        padding: 0,
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5, 
        borderBottomLeftRadius: 15, 
        borderBottomRightRadius: 15,
    },
    inputBar: {
        flex: 1,
        color: '#333',
        fontSize: 14,
    },
});

export default InputBar;