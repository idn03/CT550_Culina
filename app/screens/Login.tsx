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
import { Row, NormalText, KuraleTitle, InputBar, SubmitButton } from '@components/index';

// Other
import { StackParamList } from '@navigate/StackNavigator';
import { useGlobalContext } from '@utils/GlobalProvider';
import { signIn, getCurrentUser } from '@services/api/auth';
import { isEmail } from '@utils/Helper';
import { storeData, StorageKeys } from '@services/api/asyncStorage';
import { shadow, spacings } from '@utils/CulinaStyles';
import CulinaImgs from '@assets/index';

const LoginScreen = () => {
    const navigation: NavigationProp<StackParamList> = useNavigation();
    const { setIsLoggedIn, setUser } = useGlobalContext();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (email: string, passwd: string) => {
        if (!email || !passwd) {
            console.log('Email:', email);
            console.log('Password:', passwd);
            Alert.alert('ERROR!', 'Fill in all fields!');
            return;
        }

        setLoading(true);
        if (isEmail(email)) {
            try {
                if (passwd.length < 8) {
                    Alert.alert('ERROR!', 'Password must be at least 8 characters!');
                    setLoading(false);
                    return;
                }

                await signIn(email, passwd);

                const user = await getCurrentUser();

                if (user) {
                    setIsLoggedIn(true);
                    setUser({ $id: user.$id, email: user.email });
                    console.log('Login successfully!');
                    
                    await storeData(StorageKeys.REMEMBER_ME, 'true');
                    await storeData(StorageKeys.accountId, user.$id);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Drawer' }],
                    });
                }
            }
            catch (error) {
                Alert.alert('Login Failed', 'Account is incorrect!');
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
    }

    return (
        <ImageBackground resizeMode="cover" source={CulinaImgs.authBackground} style={styles.background}>
            <View style={[spacings.mt32, spacings.mh8]}>
                <LottieView 
                    source={CulinaImgs.hello}
                    style={styles.logo}
                    autoPlay
                    loop
                />

                <KuraleTitle style={shadow.textShadow}>Hello Chef</KuraleTitle>

                <View>
                    <Row style={styles.label}>
                        <Entypo name="email" size={18} color="#333" />
                        <NormalText style={{marginLeft: 6, fontSize: 18,}}>Email</NormalText>
                    </Row>
                    <InputBar
                        value={form.email}
                        onChangeText={(m) => setForm({...form, email: m})}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                    />
                    
                    <Row style={styles.label}>
                        <FontAwesome5 name="key" size={16} color="#333" />
                        <NormalText style={{marginLeft: 6, fontSize: 18,}}>Password</NormalText>
                    </Row>
                    <InputBar
                        value={form.password}
                        onChangeText={(pwd) => setForm({...form, password: pwd})}
                        secureTextEntry={true}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                    />

                    <Row style={{justifyContent: "flex-end"}}>
                        <SubmitButton 
                            content="Login"
                            onPress={() => handleLogin(form.email, form.password)}
                            loading={loading}
                        />
                    </Row>
                </View>

            </View>

            <View style={[styles.signUpSection, spacings.ml8, spacings.mb10]}>
                <Pressable onPress={() => navigation.navigate('SignUp')}>
                    <KuraleTitle style={shadow.textShadow}>Sign Up</KuraleTitle>
                    <NormalText style={shadow.textBlur}>Welcome to Culina - It’s cooking time</NormalText>
                </Pressable>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    logo: {
        width: 200,
        height: 140,
        alignSelf: 'center',
    },
    label: {
        marginTop: 40,
        marginLeft: 12,
    },
    signUpSection: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    }
});

export default LoginScreen;