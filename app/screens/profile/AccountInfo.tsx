import {
    NavigationProp,
    useNavigation,
} from '@react-navigation/native';
import {View, StyleSheet, Image, Pressable } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Row, InriaTitle, NormalText } from '@components/index';
import { shadow, spacings } from '@utils/CulinaStyles';
import { StackParamList } from '@navigate/StackNavigator';
import { Profile } from '@interfaces/user';

const AccountInfo: React.FC<Profile> = (
    { avatar, fullname, age, gender, slogan, totalRecipe, average, totalSaved }
) => {
    return (
        <View>

        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        width: 150,
        height: 150,
        borderWidth: 5,
        borderColor: '#B7E0FF',
        borderRadius: 75,
        boxShadow: '0 2 4 0 rgba(0, 0, 0, 0.2)',
    },
    editBtn: {
        marginTop: -20,
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 80,
        boxShadow: '0 4 4 0 rgba(0, 0, 0, 0.2)'
    },
    infoTitle: {
        marginVertical: 12,
    },
    slogan: {
        textAlign: 'center',
        width: 240,
        marginBottom: 10,
        lineHeight: 20,
    }
});

export default AccountInfo;