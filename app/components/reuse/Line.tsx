import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { spacings } from '@utils/CulinaStyles';

interface LineProps {
    style?: ViewStyle;
}

const Line: React.FC<LineProps> = ({style}) => {
    return (
        <View style={[styles.line, spacings.mv5, style]}></View>
    );
};

const styles = StyleSheet.create({
    line: {
        height: 1,
        backgroundColor: '#33333360',
    },
});

export default React.memo(Line);