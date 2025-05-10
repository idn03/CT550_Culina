import { Text, TextStyle, StyleSheet } from 'react-native';

interface TextProps {
    children: String;
    style?: TextStyle;
}

const KuraleTitle: React.FC<TextProps> = ({ children, style }) => {
    return <Text style={[ styles.normal, style ]}>{children}</Text>;
};

const styles = StyleSheet.create({
    normal: {
        fontFamily: "Kurale-Regular",
        color: "#333",
        fontSize: 28,
    },
});

export default KuraleTitle;