import React from 'react';
import {
    NavigationProp,
    useNavigation,
} from '@react-navigation/native';
import { Pressable, StyleSheet } from 'react-native';
import Row from './Row';
import KuraleTitle from './KuraleTitle';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StackParamList } from '../../navigate/StackNavigator';
import { spacings } from '../../utils/CulinaStyles';

interface StackHeaderProps {
    children: string;
}

const StackHeader: React.FC<StackHeaderProps> = ({children}) => {
    const navigation: NavigationProp<StackParamList> = useNavigation();

    return (
        <Row style={{...styles.container, ...spacings.pt12, ...spacings.ph5}}>
            <Pressable onPress={() => navigation.goBack()}>
                <AntDesign name="back" size={24} color="#333" />
            </Pressable>
            <KuraleTitle>{children}</KuraleTitle>
        </Row>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
    },
});

export default StackHeader;