// Hooks
import React, {useState, useEffect, useMemo} from 'react';

// Components
import {
    View, 
    StyleSheet, 
    Pressable, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView, 
    Image,
    Alert
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Other
// import { fetchCurrentUser } from '../../../services/api/users';
// import { uploadImage } from '../../../utils/Helper';
// import { useGlobalContext } from '../../../utils/GlobalProvider';
import { spacings, shadow } from '@utils/CulinaStyles';

const EditProfileScreen = () => {
    const radioOptions = useMemo(() => ([
        {
            id: 'Male',
            label: 'Male',
        },
        {
            id: 'Female',
            label: 'Female',
        }
    ]), []);
    const [form, setForm] = useState({
        $id: '',
        avatar: 'default_avatar.png',
        email: '',
        fullname: '',
        age: 0,
        gender: '',
        role: 'nguoidung',
        slogan: '',
    });
    const [gender, setGender] = useState<string>('Male');
    const [open, setOpen] = useState(false);
    const [age, setAge] = useState(0);
    const generateAgeItems = () => {
        const items = [];
        for (let i = 18; i <= 60; i++) {
            items.push({ label: i.toString(), value: i });
        }
        return items;
    };
    const [imageUri, setImageUri] = useState({id: '1', uri: 'https://cdn-icons-png.flaticon.com/128/15781/15781530.png'});
    const [items, setItems] = useState([...generateAgeItems()]);
    // const { triggerRefresh } = useGlobalContext();

    return (
        <View>

        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'space-evenly',
        marginHorizontal: 30,
    },
    uploadImg: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center'
    },
    preview: {
        height: 80, 
        width: 80,
        borderRadius: 10,
    },
    label: {
        marginTop: 40,
        marginLeft: 12,
    },
    ageDropdown: {
        marginTop: 20, 
        width: 200, 
        borderWidth: 0, 
        boxShadow: '0 2 4 rgba(0, 0, 0, 0.24)', 
        backgroundColor:'rgba(255, 255, 255, 0.4)', 
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5, 
        borderBottomLeftRadius: 15, 
        borderBottomRightRadius: 15
    },
    dropDownContainer: {
        borderWidth: 0, 
        backgroundColor:'rgba(255, 255, 255, 0.4)', 
        padding: 16
    },
    submitBtn: {
        backgroundColor: '#E78F81',
        marginTop: 40,
        paddingVertical: 20,
        paddingHorizontal: 28,
        borderRadius: 15,
        boxShadow: '0 2 4 0 rgba(0, 0, 0, 0.25)',
    },
});

export default EditProfileScreen;