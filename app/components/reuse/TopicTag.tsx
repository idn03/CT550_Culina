import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import TextBold from '@components/override/TextBold';
import { spacings } from '@utils/CulinaStyles';

interface TopicTagProps {
    topic: string;
    onPress?: () => void;
    selected?: boolean;
};

const TopicTag = ({ topic, onPress, selected = false }: TopicTagProps) => {
    return (
        <Pressable 
            onPress={onPress} 
            style={
                [
                    styles.topicTag, 
                    spacings.pv2, 
                    spacings.ph3, 
                    spacings.m1,
                    selected && styles.selectedTag
                ]
            }
        >
            <TextBold style={selected ? styles.selectedText : undefined}>{topic}</TextBold>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    topicTag: {
        borderWidth: 1,
        borderColor: '#33333325',
        borderRadius: 4,
    },
    selectedTag: { backgroundColor: '#333' },
    selectedText: { color: '#FFF' },
});

export default React.memo(TopicTag);