import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';
import { InriaTitle, NormalText, Row } from '@components/index';
import { Initial, Claimable, Completed } from './AchieveStates';
import { fetchUserAchievements, goalCheck, dummyAchievements } from '@services/api/achievements';
import { useGlobalContext } from '@utils/GlobalProvider';
import { spacings } from '@utils/CulinaStyles';

const AchievementList = () => {
    const [goals, setGoals] = useState<string[]>([]);
    const [claimable, setClaimable] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { refresh } = useGlobalContext();

    const loadUserAchieves = async () => {
        setIsLoading(true);
        try {
            const result = await fetchUserAchievements();
            setGoals(result);
        }
        catch (error) {
            console.error('Error fetching achievements:', error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const loadGoalCheck = async () => {
        try {
            const result = await goalCheck();
            setClaimable(result || []);
        }
        catch (error) {
            console.error('Error fetching goals:', error);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadGoalCheck();
        loadUserAchieves();
    }, [refresh]);
    
    const renderAchievementState = (itemId: string) => {
        if (isLoading) {
            return <View></View>;
        }
        if (goals.includes(itemId)) {
            return <Completed />;
        }
    
        if (claimable.includes(itemId)) {
            return <Claimable achieveId={itemId} />;
        }
    
        return <Initial />;
    };

    return (
        <FlatList
            data={dummyAchievements}
            keyExtractor={(item) => item.$id}
            renderItem={({item}) => (
                <Row style={{...styles.achievement, ...spacings.mv3, ...spacings.pv7, ...spacings.ph4}}>
                    <Row>
                        <Image source={item.thumbnail} style={[styles.thumbnail, spacings.mr2]} resizeMode='contain' />
                        <View style={{maxWidth: 180}}>
                            <InriaTitle style={{fontSize: 18}}>{item.name}</InriaTitle>
                            <NormalText style={{fontSize: 13, marginTop: 5}}>{item.description}</NormalText>
                        </View>
                    </Row>

                    {renderAchievementState(item.$id)}
                </Row>
            )} 
            style={styles.listContainer}
            contentContainerStyle={[spacings.mb10, spacings.pb8]}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        borderRadius: 20,
    },
    achievement: {
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#33333333',
        borderRadius: 10,
    },
    thumbnail: {
        height: 48,
        width: 48,
    },

});

export default AchievementList;