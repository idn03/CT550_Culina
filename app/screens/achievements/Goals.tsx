import {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { InriaTitle, NormalText } from '@components/index';
import { totalGoals, getCurrentRank } from '@services/api/achievements';
import { useGlobalContext } from '@utils/GlobalProvider';

const Goals = () => {
    const [total, setTotal] = useState<string>('0');
    const [currentRank, setCurrentRank] = useState<number>(0);
    const {refresh} = useGlobalContext();

    const loadTotal = async () => {
        const res = await totalGoals();
        return res;
    };

    const loadCurrentRank = async () => {
        try {
            const rank = await getCurrentRank();
            setCurrentRank(rank as number);
        }
        catch (error) {
            console.error(error);
        }
    };
        
    useEffect(() => {
        loadTotal().then(res => setTotal(res));
        loadCurrentRank();
    }, [refresh]);

    return (
        <View style={styles.goals}>
            <InriaTitle>Goals</InriaTitle>
            <InriaTitle style={{fontSize: 48, marginTop: 20}}>{total}</InriaTitle>
            <NormalText>{`Top ${currentRank.toString()}`}</NormalText>
        </View>
    );
}

const styles = StyleSheet.create({
    goals: {
        alignSelf: 'flex-start',
        alignItems: 'center'
    },
});

export default Goals;