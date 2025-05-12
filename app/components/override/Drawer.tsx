// Hooks
import {
    NavigationProp,
    useNavigation,
} from '@react-navigation/native';

// Components
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Row from '../reuse/Row';
import TextBold from './../override/TextBold';

import { useGlobalContext } from './../../utils/GlobalProvider';
import { StackParamList } from './../../navigate/StackNavigator';
// import { signOut } from './../../services/api/auth';
import { spacings } from '../../utils/CulinaStyles';
import CulinaImgs from './../../assets/assets';

const CulinaDrawer = (props: any) => {
    const { setIsLoggedIn, setUser } = useGlobalContext();
    const navigation: NavigationProp<StackParamList> = useNavigation();

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
            <Image source={CulinaImgs.logo} style={[styles.logo, spacings.mt10]}/>

            <View style={spacings.mt10}>
                <DrawerItemList {...props}/>
            </View>

            <Pressable 
                // onPress={() => signOut(setIsLoggedIn, setUser, navigation)} 
                style={styles.footer}
            >
                <Row style={{ alignSelf: 'center' }}>
                    <FontAwesome name="power-off" size={20} color="#E78F81" />
                    <TextBold style={{marginLeft: 6, color: '#E78F81', fontSize: 20}}>Log Out</TextBold>
                </Row>
            </Pressable>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 40,
        height: 40,
        alignSelf: 'center',
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
    }
});

export default CulinaDrawer;