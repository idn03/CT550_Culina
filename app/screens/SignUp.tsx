// Hooks
import React, { useState, useMemo } from 'react';
import {
    NavigationProp,
    useNavigation,
} from '@react-navigation/native';

import { 
    StyleSheet, 
    View, 
    ImageBackground, 
    Pressable, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView, 
    Alert 
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import DropDownPicker from 'react-native-dropdown-picker';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Row, NormalText, KuraleTitle, InputBar, SubmitButton } from './../components';

// Other
// import { createUser } from './../services/api/auth';
import { StackParamList } from './../navigate/StackNavigator';
import { shadow, spacings } from './../utils/CulinaStyles';
import CulinaImgs from './../assets/assets';

const generateAgeItems = () => {
    const items = [];
    for (let i = 18; i <= 60; i++) {
        items.push({ label: i.toString(), value: i });
    }
    return items;
};

const SignUpScreen = () => {
    return (
        <View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    signUpTitle: {},
    label: {
        marginTop: 40,
        marginLeft: 12,
    },
    ageDropdown: {
        marginTop: 20, 
        width: 200, 
        borderWidth: 0,
        backgroundColor:'#FFFFFF40', 
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5, 
        borderBottomLeftRadius: 15, 
        borderBottomRightRadius: 15
    },
    dropDownContainer: {
        borderWidth: 0, 
        backgroundColor:'#FFFFFF40', 
        padding: 16
    },
});

export default SignUpScreen;