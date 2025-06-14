// Hooks
import React, { useState, useEffect, useMemo } from 'react';

// Components
import {
    View,
    StyleSheet,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert
} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StackHeader, Loading, ImageUploader, InputBar, Row, TextBold, NormalText } from '@/components';

// Other
import { fetchCurrentUser, editUserInfo } from '@/services/api/users';
import { useGlobalContext } from '@/utils/GlobalProvider';
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
    const [imageUri, setImageUri] = useState({ id: '1', uri: 'https://cdn-icons-png.flaticon.com/128/15781/15781530.png' });
    const [items, setItems] = useState([...generateAgeItems()]);
    const [loading, setLoading] = useState<boolean>(false);
    const { triggerRefresh } = useGlobalContext();

    const handleEditProfile = async () => {
        try {
            const updatedUser = {
                ...form,
                gender,
                age,
                avatar: imageUri.uri,
                totalRecipe: 0,
                totalSaved: 0,
                average: 0
            }
            await editUserInfo(updatedUser);
            triggerRefresh();
            Alert.alert('Success', 'Profile updated successfully.');
        }
        catch (error) {
            console.log(error);
            Alert.alert('Error', 'Failed to update profile.');
        }
    }

    const loadUserInfo = async () => {
        const userFetched = await fetchCurrentUser();
        if (userFetched) {
            setForm({
                ...userFetched,
                email: '',
            });
            setGender(userFetched.gender);
            setAge(userFetched.age);
            setImageUri({ id: userFetched.$id, uri: userFetched.avatar });
        }
    };

    useEffect(() => {
        try {
            setLoading(true);
            loadUserInfo();
        }
        catch (error) {
            console.error(error);
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: '#FFF' }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps='handled'
                nestedScrollEnabled={true}
            >
                <StackHeader>Edit Profile</StackHeader>

                {loading ? (
                    <Loading />
                ) : (
                    <View style={[styles.form, spacings.mh8]}>
                        <ImageUploader
                            imageUri={imageUri}
                            setImageUri={setImageUri}
                            layout={'horizontal'}
                        />

                        <View style={spacings.mt5}>
                            <Row style={{ ...spacings.mt5, ...spacings.ml3 }}>
                                <MaterialCommunityIcons name="chef-hat" size={20} color="#333" />
                                <NormalText style={{ ...spacings.ml2, fontSize: 20 }}>Full Name</NormalText>
                            </Row>
                            <InputBar
                                value={form.fullname}
                                onChangeText={(fn) => setForm({ ...form, fullname: fn })}
                                showPassword={false}
                                setShowPassword={() => { }}
                            />
                        </View>

                        <View>
                            <Row style={{ ...spacings.mt5, ...spacings.ml3 }}>
                                <FontAwesome5 name="sign" size={20} color="#333" />
                                <NormalText style={{ ...spacings.ml2, fontSize: 20 }}>Slogan</NormalText>
                            </Row>
                            <InputBar
                                value={form.slogan}
                                onChangeText={(slg) => setForm({ ...form, slogan: slg })}
                                showPassword={false}
                                setShowPassword={() => { }}
                            />
                        </View>

                        <Row style={{ justifyContent: 'space-between' }}>
                            {/* Gender */}
                            <View>
                                <Row style={{ ...spacings.mt5, ...spacings.ml3 }}>
                                    <View style={{ ...spacings.ml2 }}>
                                        <FontAwesome5 name="transgender" size={20} color="#333" />
                                    </View>
                                    <NormalText style={{ ...spacings.ml2, fontSize: 20 }}>Gender</NormalText>
                                </Row>
                                <RadioGroup
                                    radioButtons={radioOptions}
                                    onPress={setGender}
                                    selectedId={gender}
                                    containerStyle={{ marginTop: 10, alignItems: 'flex-start' }}
                                />
                            </View>

                            {/* Age */}
                            <View>
                                <Row style={{ ...spacings.mt5, ...spacings.ml3 }}>
                                    <FontAwesome5 name="calendar-alt" size={20} color="#333" />
                                    <NormalText style={{ ...spacings.ml2, fontSize: 20 }}>Age</NormalText>
                                </Row>
                                <DropDownPicker
                                    open={open}
                                    value={age}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setAge}
                                    setItems={setItems}
                                    listMode='SCROLLVIEW'
                                    style={[styles.ageDropdown, spacings.mt5, shadow.boxShadow]}
                                    dropDownContainerStyle={[styles.dropDownContainer, spacings.p4]}
                                />
                            </View>
                        </Row>

                        <Row style={{ justifyContent: 'flex-end' }}>
                            <Pressable
                                style={[
                                    styles.submitBtn,
                                    spacings.mt10,
                                    spacings.pv5,
                                    spacings.ph7,
                                    shadow.boxShadow
                                ]}
                                onPress={() => { handleEditProfile() }}
                            >
                                <TextBold>Save change</TextBold>
                            </Pressable>
                        </Row>

                        <View style={{ margin: 30 }}></View>
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    ageDropdown: {
        width: 200,
        borderWidth: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    dropDownContainer: {
        borderWidth: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.4)'
    },
    submitBtn: {
        backgroundColor: '#E78F81',
        borderRadius: 15
    },
});

export default EditProfileScreen;