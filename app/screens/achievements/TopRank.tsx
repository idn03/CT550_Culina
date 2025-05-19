import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Row, InriaTitle, TextBold, NormalText } from './../../components';
import { getTopRank } from './../../services/api/achievements';
import { useGlobalContext } from './../../utils/GlobalProvider';
import { UserAchievement } from './../../interfaces/user';

const TopRank = () => {
    const [topRank, setTopRank] = useState<UserAchievement[]>([]);
    const [loading, setLoading] = useState(true);
    const {refresh} = useGlobalContext();

    useEffect(() => {
        const loadTopRank = async () => {
            try {
                const topRankFetched = await getTopRank();
                if (topRankFetched) {
                    setTopRank(topRankFetched);
                }
            }
            catch (error) {
                console.error('Failed to load top rank:', error);
            }
            finally {
                setLoading(false);
            }
        };

        loadTopRank();
    }, [refresh]);

    return (
        <View>
            <InriaTitle>Top 3</InriaTitle>
            {loading ? (
                <View ></View>
            ) : (
                topRank.length > 0 && (
                    <>
                        {topRank[0] && (
                            <Row style={styles.topItems}>
                                <NormalText>{`${topRank[0].fullname}`}</NormalText>
                                <TextBold>{`${topRank[0].goals.length}`}</TextBold>
                            </Row>
                        )}
                        {topRank[1] && (
                            <Row style={styles.topItems}>
                                <NormalText>{`${topRank[1].fullname}`}</NormalText>
                                <TextBold>{`${topRank[1].goals.length}`}</TextBold>
                            </Row>
                        )}
                        {topRank[2] && (
                            <Row style={styles.topItems}>
                                <NormalText>{`${topRank[2].fullname}`}</NormalText>
                                <TextBold>{`${topRank[2].goals.length}`}</TextBold>
                            </Row>
                        )}
                    </>
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    topItems: {
        marginLeft: 20, 
        marginTop: 12, 
        width: 160,
        justifyContent: 'space-between',
    },
});

export default TopRank;