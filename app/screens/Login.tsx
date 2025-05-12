// Hooks
import { useState } from 'react';
import {
    NavigationProp,
    useNavigation,
} from '@react-navigation/native';

// Components
import { StyleSheet, View, ImageBackground, Pressable, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import { Row, NormalText, KuraleTitle, InputBar, SubmitButton } from './../components';

// Other
import { isEmail } from '../utils/Helper';
import { shadow, spacings } from './../utils/CulinaStyles';
import CulinaImgs from './../assets/assets';

const LoginScreen = () => {
    return (
        <View>
            <KuraleTitle>Hehe</KuraleTitle>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default LoginScreen;