import React from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Row } from '@components/index';
import CulinaImgs from '@assets/index';
import { spacings } from '@utils/CulinaStyles';

interface LayoutSelectorProps {
    selectedLayout: string;
    onLayoutSelect: (layout: string) => void;
}

const LayoutSelector = ({ selectedLayout, onLayoutSelect }: LayoutSelectorProps) => {
    return (
        <Row style={styles.layouts}>
            {['one', 'two'].map((layoutType) => (
                <Pressable key={layoutType} onPress={() => onLayoutSelect(layoutType)}>
                    <View style={[spacings.mt2, { alignItems: 'center' }]}>
                        <Image
                            resizeMode='contain'
                            source={layoutType === 'one' ? CulinaImgs.layoutOne : CulinaImgs.layoutTwo}
                            style={{ ...styles.layoutItem, opacity: selectedLayout === layoutType ? 1 : 0.3 }}
                        />
                        {selectedLayout === layoutType && (
                            <FontAwesome name="check-square" size={24} color="#B7E0FF" style={{ paddingTop: 15 }} />
                        )}
                    </View>
                </Pressable>
            ))}
        </Row>
    );
};

const styles = StyleSheet.create({
    layouts: {
        marginLeft: -20,
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    layoutItem: {
        height: 160,
        width: 160,
    },
});

export default LayoutSelector;