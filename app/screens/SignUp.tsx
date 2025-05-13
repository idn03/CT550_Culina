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
import { createUser } from './../services/api/auth';
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
    const navigation: NavigationProp<StackParamList> = useNavigation();
    const [form, setForm] = useState({
        email: '',
        fullname: '',
        gender: false,
        age: 18,
        password: '',
    });
    const [gender, setGender] = useState<string>('Male');
    const [open, setOpen] = useState(false);
    const [age, setAge] = useState(0);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [items, setItems] = useState([...generateAgeItems()]);

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

    const handleSignUp = async () => {
        if (form.password.length < 8) {
            Alert.alert('ERROR!', 'Password must be at least 8 characters long!');
            return;
        }

        setLoading(true);
        try {
            const newUser = await createUser(form.email, form.password, form.fullname, gender, age);
            console.log('User created successfully:', newUser);
            setLoading(false);
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error creating user:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}
        >
            <ScrollView 
                contentContainerStyle={{flexGrow: 1}} 
                keyboardShouldPersistTaps='handled'
                nestedScrollEnabled={true}
            >
                <ImageBackground resizeMode="cover" source={CulinaImgs.authBackground} style={styles.background}>
                    <View style={[spacings.mt25, spacings.mh8]}>
                        <View style={styles.signUpTitle}> 
                            <KuraleTitle style={shadow.textShadow }>Sign Up</KuraleTitle>
                            <NormalText style={shadow.textBlur}>Welcome to Culina - It’s cooking time</NormalText>
                        </View>

                        {/* Email */}
                        <Row style={styles.label}>
                            <Entypo name="email" size={18} color="#333" />
                            <NormalText style={{marginLeft: 6, fontSize: 18}}>Email</NormalText>
                        </Row>
                        <InputBar
                            value={form.email}
                            onChangeText={(m) => setForm({...form, email: m})}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />

                        {/* Full Name */}
                        <Row style={styles.label}>
                            <MaterialCommunityIcons name="chef-hat" size={18} color="#333" />
                            <NormalText style={{marginLeft: 6, fontSize: 18}}>Full Name</NormalText>
                        </Row>
                        <InputBar
                            value={form.fullname}
                            onChangeText={(fn) => setForm({...form, fullname: fn})}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />

                        <Row style={{justifyContent: 'space-between'}}>
                            {/* Gender */}
                            <View>
                                <Row style={styles.label}>
                                    <View style={{marginLeft: 6}}>
                                        <FontAwesome5 name="transgender" size={18} color="#333" />
                                    </View>
                                    <NormalText style={{marginLeft: 6, fontSize: 18}}>Gender</NormalText>
                                </Row>
                                <RadioGroup 
                                    radioButtons={radioOptions} 
                                    onPress={setGender}
                                    selectedId={gender}
                                    containerStyle={{marginTop: 10, alignItems: 'flex-start'}}
                                    labelStyle={{fontSize: 14}}
                                />
                            </View>

                            {/* Age */}
                            <View>
                                <Row style={styles.label}>
                                    <FontAwesome5 name="calendar-alt" size={18} color="#333" />
                                    <NormalText style={{marginLeft: 6, fontSize: 18}}>Age</NormalText>
                                </Row>
                                <DropDownPicker 
                                    open={open}
                                    value={age}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setAge}
                                    setItems={setItems}
                                    listMode='SCROLLVIEW'
                                    style={StyleSheet.flatten([styles.ageDropdown, shadow.boxShadow])}
                                    dropDownContainerStyle={styles.dropDownContainer}
                                />
                            </View>
                        </Row>

                        {/* Password */}
                        <Row style={styles.label}>
                            <FontAwesome5 name="key" size={16} color="#333" />
                            <NormalText style={{marginLeft: 6, fontSize: 18}}>Password</NormalText>
                        </Row>
                        <InputBar
                            value={form.password}
                            onChangeText={(pwd) => setForm({...form, password: pwd})}
                            secureTextEntry={true}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />

                        <Row style={{justifyContent: 'flex-end'}}>
                            <SubmitButton 
                                content="Sign Up"
                                onPress={() => {handleSignUp()}}
                                loading={loading}
                            />
                        </Row>

                        <Pressable 
                            style={{alignItems: 'flex-end', marginTop: -20}} 
                            onPress={() => navigation.navigate('Login')}
                        >
                            <NormalText>Do you have an account?</NormalText>
                        </Pressable>
                    </View>
                </ImageBackground>
            </ScrollView>
        </KeyboardAvoidingView>
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