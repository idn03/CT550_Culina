import {View, StyleSheet} from 'react-native';
import { Swing } from 'react-native-animated-spinkit';
import { spacings } from '@utils/CulinaStyles';

const Loading = () => {
    return (
        <View style={[styles.loadingContainer, spacings.mv20]}>
            <Swing size={40} color='#333' />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#333',
    },
});

export default Loading;