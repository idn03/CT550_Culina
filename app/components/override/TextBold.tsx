import { Text, TextStyle, StyleSheet } from 'react-native';

interface TextProps {
    children: String;
    style?: TextStyle;
}

const TextBold: React.FC<TextProps> = ({ children, style }) => {
    return <Text style={[ styles.normal, style ]}>{children}</Text>;
};

const styles = StyleSheet.create({
    normal: {
        fontFamily: "InriaSans-Bold",
        color: "#333",
        fontSize: 14,
    },
});

export default TextBold;