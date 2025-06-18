import { useState, useEffect } from "react";
import { View, StyleSheet, Image } from 'react-native';
import { CopilotStep, walkthroughable } from "react-native-copilot";
import { Header, InriaTitle, NormalText, Row, Loading } from '@/components';
import CulinaImgs from "@/assets";
import { spacings } from "@utils/CulinaStyles";

const WalkthroughableView = walkthroughable(View);

const RecommenderScreen = () => {
    const [loading, setLoading] = useState(true);

    const loadScreen = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
    };

    useEffect(() => {
        loadScreen();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Header>Recommender</Header>

            {loading ? (
                <Loading />
            ) : (
                <View style={[styles.main, spacings.ph8, spacings.pt5]}>
                    <CopilotStep
                        text="Discover all the recommend recipes on this screen, feel free with this feature :3"
                        order={5}
                        name="Recommender Screen"
                    >
                        <WalkthroughableView>
                            <View>
                                <Image source={CulinaImgs.stickerTwo} style={styles.aiStickers} />
                                <View>
                                    <InriaTitle>Let A.I Assistant Recommend Recipes For You</InriaTitle>
                                    <NormalText>By tracking user behaviors, Culina 2 can remember what is your favorite foods, I will recommend some related recipes around it.</NormalText>
                                </View>
                            </View>
                        </WalkthroughableView>
                    </CopilotStep>
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

export default RecommenderScreen;