// Hooks
import { useState, useEffect } from 'react';
import {
    NavigationProp,
    useNavigation,
} from '@react-navigation/native';
import { useGlobalContext } from '../../../utils/GlobalProvider';

// Components
import { 
    View, 
    StyleSheet,
    Image, 
    ScrollView 
} from 'react-native';
import { 
    MenuProvider, 
    Menu, 
    MenuOptions, 
    MenuOption, 
    MenuTrigger 
} from 'react-native-popup-menu';
import Feather from '@expo/vector-icons/Feather';
import { 
    StackHeader,
    KuraleTitle, 
    InriaTitle, 
    NormalText, 
    Row, 
    TextBold, 
    Line,
    Loading 
} from './../../../components';

// Other
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from '../../../navigate/StackNavigator';
// import { deleteRecipe } from '../../../services/api/recipes';
import { formatDate } from '../../../utils/Helper';

type RecipeDetailScreenRouteProp = RouteProp<StackParamList, 'RecipeDetail'>;

const RecipeDetailScreen = ({ route }: { route: RecipeDetailScreenRouteProp }) => {
    const navigation: NavigationProp<StackParamList> = useNavigation();
    const { recipeId } = route.params;
    
    return (
        <View style={styles.container}>
            <StackHeader>Detail</StackHeader>

            <Loading />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    title: {
        zIndex: 1,
        marginBottom: -24,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: '#FFF',
    },
    score: { 
        zIndex: 1,
        fontSize: 20,
        marginBottom: -36,
        padding: 10,
        borderRadius: 30,
        backgroundColor: '#FFF',
    },
    thumbnail: {
        width: '100%',
        height: 300,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    postContent: {
        flex: 1,
        backgroundColor: '#FFF',
        marginTop: -20,
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 24,
        boxShadow: '0 -2 4 0 rgba(0,0,0,0.2)',
    },
    avatar: {
        width: 63,
        height: 63,
        marginRight: 6,
        borderWidth: 3,
        borderColor: '#B7E0FF',
        borderRadius: '50%',
        boxShadow: '0 2 2 0 rgba(0,0,0,0.2)',
    },
    sliderContainer: {
        justifyContent: 'space-between', 
        marginTop: 15, 
        marginHorizontal: 30
    },
    btn: {
        backgroundColor: '#E78F81',
        paddingVertical: 20,
        paddingHorizontal: 28,
        borderRadius: 15,
        boxShadow: '0 2 4 0 rgba(0, 0, 0, 0.25)',
    }
});

const optionsStyles = {
    optionsContainer: {
        backgroundColor: '#FFF',
        marginLeft: 20,
        paddingLeft: 10,
        shadowColor: '#FFF'
    },
};

export default RecipeDetailScreen;