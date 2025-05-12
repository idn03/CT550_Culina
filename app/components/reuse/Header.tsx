import React, { useEffect, useMemo } from 'react';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { StyleSheet, View, Pressable, Animated } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Row from './Row';
import KuraleTitle from './KuraleTitle';
import { spacings } from '../../utils/CulinaStyles';

interface HeaderProps {
    children: String;
}

const dummyIcons = [
    <FontAwesome6 name="bell-concierge" size={24} color="#333" />,
    <FontAwesome6 name="mitten" size={24} color="#333" />,
    <FontAwesome6 name="bone" size={24} color="#333" />,
    <FontAwesome6 name="leaf" size={24} color="#333" />,
    <MaterialCommunityIcons name="qrcode" size={24} color="#333" />,
    <MaterialCommunityIcons name="chef-hat" size={24} color="#333" />,
    <MaterialCommunityIcons name="silverware-clean" size={24} color="#333" />,
    <MaterialCommunityIcons name="coffee" size={24} color="#333" />,
];

const Header: React.FC<HeaderProps> = ({ children }) => {
    const navigation = useNavigation();

    const fadeAnims = useMemo(() => [
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0)
    ], []);

    const randomIcons = useMemo(() => {
        const shuffled = [...dummyIcons].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    }, []);

    useEffect(() => {
        fadeAnims.forEach((anim, index) => {
            Animated.sequence([
                Animated.delay(index * 500),
                Animated.timing(anim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                })
            ]).start();
        });
    }, []);

    return (
        <View style={[spacings.pt12, spacings.ph5]}>
            <Row style={{ justifyContent: 'space-between' }}>
                <View>
                    <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={[spacings.pt5, spacings.pr5]}>
                        <AntDesign name="appstore-o" size={24} color="#333" />
                    </Pressable>
                    <KuraleTitle>{children}</KuraleTitle>
                </View>

                <View style={{ alignSelf: 'flex-end', ...spacings.pb2 }}>
                    <Row style={{justifyContent: 'space-between', width: 90}}>
                        {randomIcons.map((icon, index) => (
                            <Animated.View
                                key={index}
                                style={{
                                    opacity: fadeAnims[index]
                                }}
                            >
                                {icon}
                            </Animated.View>
                        ))}
                    </Row>
                </View>
            </Row>
        </View>
    );
}

export default React.memo(Header);