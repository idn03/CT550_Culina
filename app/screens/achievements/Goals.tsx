import {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { InriaTitle } from '@components/index';
import { totalGoals } from '@services/api/achievements';
import { useGlobalContext } from '@utils/GlobalProvider';

const Goals = () => {
    const [total, setTotal] = useState<string>('0');
    const {refresh} = useGlobalContext();

    const loadTotal = async () => {
        const res = await totalGoals();
        return res;
    }
    
    useEffect(() => {
        loadTotal().then(res => setTotal(res));
    }, [refresh]);

    return (
        <View style={styles.goals}>
            <InriaTitle>Goals</InriaTitle>
            <InriaTitle style={{fontSize: 48, marginTop: 20}}>{total}</InriaTitle>
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