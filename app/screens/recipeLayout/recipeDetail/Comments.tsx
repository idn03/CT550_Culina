import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, TextInput } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Row, Avatar, InriaTitle, TextBold, NormalText } from '@/components';
import { createComment, fetchCommentsInRecipe, deleteComment } from '@/services/api/comments';
import { spacings } from '@/utils/CulinaStyles';
import { Comment } from '@/interfaces/comments';
import { useGlobalContext } from '@/utils/GlobalProvider';

interface CommentsProps {
    recipeId: string;
    avatar: string;
    userId: string;
}

const Comments: React.FC<CommentsProps> = ({ recipeId, avatar, userId }) => {
    const [content, setContent] = useState('');
    const [list, setList] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);
    const { refresh, triggerRefresh } = useGlobalContext();

    const handleComment = async () => {
        try {
            setLoading(true);
            await createComment({
                recipeId: recipeId,
                content: content,
                userId: userId
            });
            triggerRefresh();
        }
        catch (error) {
            console.error(error);
        }
    }

    const loadComments = async () => {
        try {
            setLoading(true);
            const comments = await fetchCommentsInRecipe(recipeId);
            setList(comments);
        }
        catch (error) {
            console.error(error);
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadComments();
    }, [refresh]);

    return (
        <View>
            <InriaTitle>Comments</InriaTitle>
            <View style={spacings.mv4}>
                <Row style={{ justifyContent: 'space-between' }}>
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
            <View style={[spacings.mt4]}>
                {list.map((comments) => {
                    const owned = comments.author.$id === userId;
                    return (
                        <Row key={comments.$id} style={{ justifyContent: 'space-between' }}>
                            <Row>
                                <Avatar uri={comments.author.avatar} size={48} />
                                <TextBold>{comments.author.fullname}</TextBold>
                                <NormalText style={spacings.ml2}>{comments.content}</NormalText>
                            </Row>
                            {owned && (
                                <Pressable
                                    style={[spacings.p2]}
                                    onPress={() => deleteComment(comments.$id)}
                                >
                                    <FontAwesome name="trash" size={20} color="#333" />
                                </Pressable>
                            )}
                        </Row>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
});

export default Comments;