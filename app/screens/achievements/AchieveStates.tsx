import React, { useEffect, useRef } from 'react';
import {View, StyleSheet, Pressable, Image, Animated} from 'react-native';
import { TextBold } from '@components/index';
import { goalByUser } from '@services/api/achievements';
import { useGlobalContext } from '@utils/GlobalProvider';
import CulinaImgs from '@assets/index';
import { spacings } from '@utils/CulinaStyles';

interface FadeInViewProps {
    style?: object;
    children: React.ReactNode;
}

interface ClaimableProp {
    achieveId: string;
}

const FadeInView: React.FC<FadeInViewProps> = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <Animated.View style={{ ...props.style, opacity: fadeAnim }}>
            {props.children}
        </Animated.View>
    );
};

export const Initial = () => {
    return (
        <FadeInView style={styles.stateContainer}>
            <View>
                <TextBold style={styles.init}>In-progress</TextBold>
            </View>
        </FadeInView>
    );
};

export const Claimable:React.FC<ClaimableProp> = ({achieveId}) => {
    const { triggerRefresh } = useGlobalContext();

    const handleClaim = async () => {
        try {
            await goalByUser(achieveId);
            triggerRefresh();
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <FadeInView style={styles.stateContainer}>
            <Pressable onPress={() => {
                handleClaim();
            }} style={[spacings.p2]}>
                <TextBold style={styles.claimLabel}>Claim</TextBold>
            </Pressable>
        </FadeInView>
    );
};

export const Completed = () => {
    return (
        <FadeInView style={styles.stateContainer}>
            <Image source={CulinaImgs.checked} style={styles.completed} />
        </FadeInView>
    );
};

const styles = StyleSheet.create({
    stateContainer: {
        alignContent: 'center'
    },
    init: {
        opacity: 0.6, 
        textAlign: 'center'
    },
    claimLabel: {
        textShadowColor: '#00000040',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    completed: {
        height: 40,
        width: 40,
    },
});