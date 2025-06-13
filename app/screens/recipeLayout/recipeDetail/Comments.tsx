import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, TextInput } from "react-native";
import { Row, Avatar, InriaTitle, TextBold } from '@/components';
import { createComment, fetchCommentsInRecipe } from '@/services/api/comments';
import { spacings } from '@/utils/CulinaStyles';
import { Comment } from '@/interfaces/comments';

interface CommentsProps {
    recipeId: string;
    avatar: string;
    userId: string;
}

const Comments: React.FC<CommentsProps> = ({ recipeId, avatar, userId }) => {
    const [content, setContent] = useState('');
    const [list, setList] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);

    const handleComment = async () => {
        try {
            setLoading(true);
            await createComment({
                recipeId: recipeId,
                content: content,
                userId: userId
            }); 
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
            <InriaTitle>Comments</InriaTitle>
            <View style={spacings.mv4}>
                <Row style={{justifyContent: 'space-between'}}>
                    <Row>
                        <Avatar uri={avatar} size={48} />
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
                        onPress={() => { handleComment() }}
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