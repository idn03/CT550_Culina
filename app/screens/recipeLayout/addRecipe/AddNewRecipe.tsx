// Hooks
import React, { useState, useEffect } from 'react';

// Components
import { 
    View, 
    StyleSheet, 
    Pressable, 
    Image, 
    Alert, 
    TextInput, 
    ScrollView,
    KeyboardAvoidingView,  
    Platform
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { 
    Header, 
    Row, 
    InriaTitle, 
    KuraleTitle, 
    NormalText, 
    TextBold, 
    Line,
    Loading 
} from '@components/index';
import InputIngredients from '@screens/recipeLayout/InputIngredients';
import Author from '@screens/recipeLayout/Author';

// Other
// import { uploadImage, getCurrentDate } from '@utils/Helper';
// import { createRecipe } from '@services/api/recipes';
// import { fetchCurrentUser } from '@services/api/users';
// import { useGlobalContext } from '@utils/GlobalProvider';
import CulinaImgs from '@assets/index';
import { spacings, shadow } from '@utils/CulinaStyles';

const AddNewRecipe: React.FC = () => {
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
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Header>Add New Recipe</Header>
            <Loading />
        </View>
    );
};

const styles = StyleSheet.create({
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

export default AddNewRecipe;