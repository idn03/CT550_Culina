import React from 'react';
import { View } from 'react-native';
import { Row, NormalText, TextBold, Avatar } from '@components/index';
import { getCurrentDate } from '@utils/Helper';

interface AuthorProps {
    avatar: string;
    fullname: string;
}

const Author: React.FC<AuthorProps> = ({ avatar, fullname }) => {
    const today = getCurrentDate() as string;

    return (
        <Row>
            <Avatar uri={avatar} />
            <View>
                <Row>
                    <NormalText>Posted by </NormalText>
                    <TextBold>{fullname}</TextBold>
                </Row>
                <NormalText>{today}</NormalText>
            </View>
        </Row>
    );
}

export default Author;