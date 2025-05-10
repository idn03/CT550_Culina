import { Text, TextStyle, StyleSheet } from 'react-native';

interface TextProps {
    children: String;
    style?: TextStyle;
}

const NormalText: React.FC<TextProps> = ({ children, style }) => {
    return <Text style={[ styles.normal, style ]}>{children}</Text>;
};

const styles = StyleSheet.create({
    normal: {
        fontFamily: "InriaSans-Regular",
        color: "#333",
        fontSize: 14,
    },
});

export default NormalText;