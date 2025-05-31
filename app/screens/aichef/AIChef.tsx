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
            <Header>Recommender</Header>

            {loading ? (
                <Loading />
            ) : (
                <View style={[styles.main, spacings.ph8, spacings.pt5]}>
                    <Row>
                        <View>
                            <Image source={CulinaImgs.stickerOne} style={styles.aiStickers} />
                            <View>
                                <InriaTitle>Let A.I Assistant Recommend Recipes For You</InriaTitle>
                                <NormalText>By tracking user behaviors, Culina 2 can remember what is your favorite foods, I will recommend some related recipes around it.</NormalText>
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