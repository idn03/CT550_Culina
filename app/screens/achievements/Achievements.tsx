import React, { useState, useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import { Header, Row, Line, Loading } from '@components/index';
import Goals from './Goals';
import TopRank from './TopRank';
import AchievementList from './AchievementList';
import { spacings } from '@utils/CulinaStyles';

const AchievementsScreen = () => {
    const [loading, setLoading] = useState(true);

    const loadScreen = async () => {
        await new Promise(resolve => setTimeout(resolve, 2500));
        setLoading(false);
    };

    useEffect(() => {
        loadScreen();
    }, []);

    return (
        <View style={{flex: 1, backgroundColor: '#FFF'}}>
            <Header>Achievement</Header>

            {loading ? (
                <Loading />
            ) : (
                <View style={{ ...spacings.ph8, flex: 1 }}>
                    <Row style={styles.scoreboard}>
                        <Goals />
                        <TopRank />
                    </Row>

                    <Line />

                    <AchievementList />
                    <View style={[spacings.m9]}></View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    scoreboard: {
        marginTop: 20,
        justifyContent: 'space-around',
    },
});

export default AchievementsScreen;