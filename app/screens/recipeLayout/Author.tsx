import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Row, NormalText, TextBold } from '@components/index';
import { getCurrentDate } from '@utils/Helper';
import { spacings, shadow } from '@utils/CulinaStyles';

interface AuthorProps {
    avatar: string;
    fullname: string;
}

const Author: React.FC<AuthorProps> = ({avatar, fullname}) => {
    const today = getCurrentDate() as string;

    return (
        <View style={[spacings.mt5]}>
            <Row>
                <Image source={{uri: avatar}} style={[styles.avatar, spacings.mr2, shadow.boxShadow]} />
                <View>
                    <Row>
                        <NormalText>Posted by </NormalText>
                        <TextBold>{fullname}</TextBold>
                    </Row>
                    <NormalText>{today}</NormalText>
                </View>
            </Row>
        </View>
    );
}

const styles = StyleSheet.create({
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderColor: '#B7E0FF',
        borderRadius: '50%',
    },
});

export default Author;