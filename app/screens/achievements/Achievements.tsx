import React, { useState, useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import { 
    // Header, 
    Row, Line, Loading } from './../../components';
import { spacings } from '../../utils/CulinaStyles';

const AchievementsScreen = () => {
    const [loading, setLoading] = useState(true);

    return (
        <View></View>
    );
};

const styles = StyleSheet.create({
    scoreboard: {
        marginTop: 20,
        justifyContent: 'space-around',
    },
});

export default AchievementsScreen;