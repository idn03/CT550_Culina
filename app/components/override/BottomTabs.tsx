import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Animated } from 'react-native';
import { CopilotStep, walkthroughable } from "react-native-copilot";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Row from '@components/reuse/Row';
import { spacings, shadow } from '@utils/CulinaStyles';

const WalkthroughableView = walkthroughable(View);

const BottomTabs = ({ state, navigation }: any) => {
    const [scaleValues] = useState({
        Main: new Animated.Value(1),
        AIchef: new Animated.Value(1),
        AddRecipe: new Animated.Value(1),
        Achievements: new Animated.Value(1),
        Profile: new Animated.Value(1),
    });

    type ScreenNames = 'Main' | 'AIchef' | 'AddRecipe' | 'Achievements' | 'Profile';

    const getIconColor = (screenName: string) => {
        if (!state) return '#333';

        const currentRouteName = state.routeNames[state.index];
        return currentRouteName === screenName ? '#E78F81' : '#333';
    };

    const handlePressIn = (screenName: ScreenNames) => {
        Animated.spring(scaleValues[screenName], {
            toValue: 0.85,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = (screenName: ScreenNames) => {
        Animated.spring(scaleValues[screenName], {
            toValue: 1,
            friction: 4,
            useNativeDriver: true,
        }).start();
        navigation.navigate(screenName);
    };

    return (
        <View style={[styles.container, spacings.p8]}>
            <CopilotStep
                text="Bottom bar that will help you move between screens through touch operations"
                order={4}
                name="Bottom Tabs"
            >
                <WalkthroughableView>
                    <Row style={{
                        ...styles.bottomTabs,
                        ...shadow.boxShadow,
                        ...spacings.p3,
                        ...spacings.ph5,
                    }}>
                        {[
                            {
                                name: 'Main',
                                icon: <Entypo name="book" size={24} color={getIconColor('Main')} style={{ padding: 10 }} />
                            },
                            {
                                name: 'AIchef',
                                icon: <MaterialIcons name="cookie" size={24} color={getIconColor('AIchef')} style={{ padding: 10 }} />
                            },
                            {
                                name: 'AddRecipe',
                                icon: <Entypo name="squared-plus" size={30} color={getIconColor('AddRecipe')} style={{ padding: 10 }} />
                            },
                            {
                                name: 'Achievements',
                                icon: <FontAwesome5 name="fire" size={24} color={getIconColor('Achievements')} style={{ padding: 10 }} />
                            },
                            {
                                name: 'Profile',
                                icon: <FontAwesome name="user" size={24} color={getIconColor('Profile')} style={{ padding: 10 }} />
                            }
                        ].map((tab) => (
                            <Pressable
                                key={tab.name}
                                onPressIn={() => handlePressIn(tab.name as ScreenNames)}
                                onPressOut={() => handlePressOut(tab.name as ScreenNames)}
                            >
                                <Animated.View style={{ transform: [{ scale: scaleValues[tab.name as ScreenNames] }] }}>
                                    {tab.icon}
                                </Animated.View>
                            </Pressable>
                        ))}
                    </Row>
                </WalkthroughableView>
            </CopilotStep>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
    },
    bottomTabs: {
        backgroundColor: '#FFF',
        width: '100%',
        justifyContent: 'space-between',
        borderRadius: 40,
    },
});

export default BottomTabs;