import React from 'react';
import { View, StyleSheet } from "react-native";
import { Header, KuraleTitle, NormalText, TextBold } from "./../../components";
import { shadow, spacings } from './../../utils/CulinaStyles';

const AboutUsScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Header>About Us</Header>

            <View style={[styles.main, shadow.boxShadow, spacings.m8]}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <KuraleTitle>Culina</KuraleTitle>
                    <View style={{alignItems: 'center'}}>
                        <TextBold>Author</TextBold>
                        <NormalText>Dang Nhat Duy</NormalText>
                    </View>
                    
                    <View style={{alignItems: 'center'}}>
                        <TextBold>St.code</TextBold>
                        <NormalText>B2105568</NormalText>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <TextBold>Sb.code</TextBold>
                        <NormalText>CT550</NormalText>
                        <NormalText>Luan Van Tot Nghiep</NormalText>
                    </View>

                    <View style={{alignItems: 'center'}}>
                        <TextBold>Semester</TextBold>
                        <NormalText>4th.III</NormalText>
                    </View>

                    <TextBold>Thanks for using my app</TextBold>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        minHeight: '60%',
        backgroundColor: '#FFF5CD',
        borderRadius: 32,
    }
});

export default React.memo(AboutUsScreen);