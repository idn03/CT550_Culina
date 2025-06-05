import {
    NavigationProp,
    useNavigation,
} from '@react-navigation/native';
import { View, StyleSheet, Pressable } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Row, InriaTitle, NormalText, Avatar } from '@components/index';
import { shadow, spacings } from '@utils/CulinaStyles';
import { StackParamList } from '@navigate/StackNavigator';
import { Profile } from '@interfaces/user';

const generateGender = [
    {
        $id: 'Female',
        pronoun: 'She / Her',
    },
    {
        $id: 'Male',
        pronoun: 'He / Him',
    }
];

const AccountInfo: React.FC<Profile> = (
    { avatar, fullname, gender, slogan, totalRecipe, average, totalSaved }
) => {
    const navigation: NavigationProp<StackParamList> = useNavigation();

    return (
        <View style={{ backgroundColor: '#FFF' }}>
            <Row style={{...spacings.pv5}}>
                <View>
                    <Avatar 
                        uri={avatar}
                        size={120}
                    />
                    <Pressable 
                        onPress={() => navigation.navigate('EditProfile')} 
                        style={[styles.editBtn, spacings.p2, shadow.boxShadow]}
                    >
                        <FontAwesome6 name="user-pen" size={18} color="#333" />
                    </Pressable>
                </View>

                <View style={[spacings.ml2]}>
                    <Row style={{...spacings.mb2}}>
                        <InriaTitle>{fullname}</InriaTitle>
                        <NormalText 
                            style={{...spacings.mb2, ...spacings.ml1, ...shadow.textBlur}}
                        >
                            {`${generateGender.find(g => g.$id === gender)?.pronoun}`}
                        </NormalText>
                    </Row>
                    <NormalText style={{...spacings.ml2}}>{slogan}</NormalText>
                </View>
            </Row>

            <Row style={{ justifyContent: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                    <InriaTitle>{totalRecipe.toString()}</InriaTitle>
                    <NormalText>Recipes</NormalText>
                </View>
                <View style={{ alignItems: 'center', ...spacings.mh20 }}>
                    <InriaTitle>{average.toFixed(1)}</InriaTitle>
                    <NormalText>Average</NormalText>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <InriaTitle>{totalSaved.toString()}</InriaTitle>
                    <NormalText>Saved</NormalText>
                </View>
            </Row>
        </View>
    );
};

const styles = StyleSheet.create({
    editBtn: {
        marginTop: -20,
        backgroundColor: '#FFF',
        width: 'auto',
        alignSelf: 'center',
        borderRadius: 50,
    }
});

export default AccountInfo;