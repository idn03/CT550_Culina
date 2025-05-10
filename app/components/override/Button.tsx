import React from 'react';
import {Pressable, PressableProps, StyleSheet} from 'react-native';
import TextBold from './TextBold';
import { spacings, shadow } from '../../utils/CulinaStyles';

interface SubmitButtonProps extends PressableProps {
    content: string;
    loading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
    content,
    loading = false,
    disabled = false,
    ...props 
}) => {
    return (
        <Pressable 
            style={[styles.submitBtn, spacings.mv10, spacings.pv5, spacings.ph7, shadow.boxShadow]}
            disabled={disabled || loading}
            {...props}
        >
            <TextBold>{loading ? 'Loading...' : content}</TextBold>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    submitBtn: {
        backgroundColor: '#E78F81',
        borderRadius: 15,
    },
});

export default SubmitButton;