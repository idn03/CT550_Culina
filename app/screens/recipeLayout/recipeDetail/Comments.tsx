import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, TextInput } from "react-native";
import { Row, Avatar, InriaTitle, NormalText, TextBold } from '@/components';
import { fetchCurrentUser } from '@/services/api/users';
import { spacings } from '@/utils/CulinaStyles';

interface CommentsProps {
    recipeId: string;
    avatar: string;
    fullname: string;
}

const Comments: React.FC<CommentsProps> = ({ recipeId, avatar, fullname }) => {
    const [content, setContent] = useState('');
    return (
        <View>
            <InriaTitle>Comments</InriaTitle>
            <View style={spacings.mv4}>
                <Row style={{justifyContent: 'space-around'}}>
                    <Row>
                        <Avatar uri={avatar} />
                        <TextInput
                            value={content}
                            onChangeText={(cont) => setContent(cont)}
                            placeholder='Type comment here...'
                            placeholderTextColor={'#33333350'}
                            style={[spacings.pt2, { color: '#333' }]}
                        />
                    </Row>

                    <Pressable
                        style={[spacings.p2]}
                        onPress={() => { }}
                    >
                        <TextBold style={{ fontSize: 28 }}>+</TextBold>
                    </Pressable>
                </Row>
            </View>

            {/* Comment List here */}
            
        </View>
    );
};

const styles = StyleSheet.create({
});

export default Comments;