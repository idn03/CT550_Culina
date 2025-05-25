import { Image, StyleSheet } from "react-native";
import CulinaImgs from "@/assets";
import { spacings, shadow } from "@/utils/CulinaStyles";

interface AvatarProps {
    uri?: string;
    size?: number;
}

const Avatar = ({ uri, size = 63 }: AvatarProps) => {
    return (
        <Image
            source={uri ? { uri } : CulinaImgs.altAvatar}
            style={[
                styles.avatar,
                spacings.mr2,
                shadow.boxShadow,
                { width: size, height: size }
            ]}
        />
    );
};

const styles = StyleSheet.create({
    avatar: {
        borderWidth: 3,
        borderColor: '#B7E0FF',
        borderRadius: 999,
    },
});

export default Avatar;