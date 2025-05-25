import { useState, useEffect } from "react";
import {View, StyleSheet, Image} from 'react-native';
import { Header, InriaTitle, NormalText, Row, Loading } from '@/components';
import CulinaImgs from "@/assets";
import { spacings } from "@utils/CulinaStyles";

const AIChefScreen = () => {
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <View style={{flex: 1, backgroundColor: '#FFF'}}>
            <Header>For You</Header>

            {loading ? (
                <Loading />
            ) : (
                <View style={[styles.main, spacings.ph8, spacings.pt5]}>
                    <Row>
                        <View>
                            <Image source={CulinaImgs.stickerOne} style={styles.aiStickers} />
                            <View>
                                <InriaTitle>Ask A.I Assistant</InriaTitle>
                                <NormalText>Chating with Culina Assistant to create or modify a recipe for you.</NormalText>
                            </View>
                        </View>
                    </Row>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        width: '100%',
    },
    aiStickers: {
        width: 60,
        height: 60,
    }
});

export default AIChefScreen;