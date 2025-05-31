// Hooks
import React, { useState, useEffect } from 'react';

// Components
import { 
    View, 
    StyleSheet,
    Image,
    Pressable, 
    ScrollView,
    TextInput,
    Alert,
    KeyboardAvoidingView,  
    Platform 
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { 
    StackHeader,
    Row,
    NormalText, 
    InriaTitle, 
    KuraleTitle,
    Line  
} from '@components/index';
import InputIngredients from '@/components/reuse/InputIngredients';
import Author from '@/components/reuse/Author';

// Other
import { RouteProp } from '@react-navigation/native';
// import { uploadImage, getCurrentDate } from '@utils/Helper';
import { StackParamList } from '@navigate/StackNavigator';
// import { fetchRecipeDetail, editRecipe } from '@services/api/recipes';
// import { fetchCurrentUser } from '@services/api/users';
import { useGlobalContext } from '@utils/GlobalProvider';
import CulinaImgs from '@assets/index';
import { spacings, shadow } from '@utils/CulinaStyles';

type EditRecipeScreenRouteProp = RouteProp<StackParamList, 'EditRecipe'>;

const EditRecipeScreen = ({ route }: { route: EditRecipeScreenRouteProp }) => {
    const { recipeId } = route.params;
    const [user, setUserFetched] = useState({
        avatar: 'default_avatar.png',
        fullname: '',
    });
    const [imageUri, setImageUri] = useState({id: '1', uri: 'https://cdn-icons-png.flaticon.com/128/15781/15781530.png'});
    const [form, setForm] = useState({
        dishname: '',
        description: '',
        ingredients: [] as string[],
    });

    return (
        <View></View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    layouts: {
        marginTop: 10,
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
        color: '#333'
    },
});

export default EditRecipeScreen;