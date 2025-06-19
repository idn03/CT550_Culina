import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
    Header,
    Loading,
    SimplePost,
    Row,
    TextBold,
    NormalText,
    InriaTitle
} from '@/components';
import { getHistoryRating } from '@/services/api/history';
import { HistoryRating } from '@/interfaces/history';
import { useGlobalContext } from '@/utils/GlobalProvider';
import { spacings } from '@/utils/CulinaStyles';

const HistoryScreen = () => {
    const [loading, setLoading] = useState(true);
    const [ratings, setRatings] = useState<HistoryRating[]>([]);
    const [totalRatings, setTotalRatings] = useState(0);
    const { refresh } = useGlobalContext();

    const loadScreen = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
    };

    const loadHistory = async () => {
        try {
            setLoading(true);
            const historyRatings = await getHistoryRating();
            setRatings(historyRatings);
            setTotalRatings(historyRatings.length);
        }
        catch (error) {
            console.error(error);
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadScreen();
        loadHistory();
    }, [refresh]);

    return (
        <View style={styles.container}>
            <Header>History</Header>

            {loading ? (
                <Loading />
            ) : (
                <View style={[spacings.mh8, spacings.mt5, styles.main]}>
                    <Row style={{ justifyContent: 'space-around' }}>
                        <View style={{ alignItems: 'center' }}>
                            <InriaTitle>{totalRatings.toString()}</InriaTitle>
                            <NormalText>Total Rating</NormalText>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <InriaTitle>0</InriaTitle>
                            <NormalText>Total Comments</NormalText>
                        </View>
                    </Row>
                    <FlatList
                        data={ratings}
                        keyExtractor={(item) => item.$id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={{ flex: 1, ...spacings.mt10 }}>
                                <Row style={{ justifyContent: 'space-between' }}>
                                    <Row>
                                        <FontAwesome6 name="bell-concierge" size={18} color="#333" />
                                        <NormalText style={spacings.mh2}>Score Rated:</NormalText>
                                        <TextBold>{item.score.toFixed(1)}</TextBold>
                                    </Row>
                                    <Row>
                                        <Ionicons name="calendar-sharp" size={18} color="#333" />
                                        <NormalText style={spacings.mh2}>Rated on:</NormalText>
                                        <TextBold>{item.ratedOn}</TextBold>
                                    </Row>
                                </Row>
                                <SimplePost
                                    $id={item.recipeData.$id}
                                    title={item.recipeData.title}
                                    description={item.recipeData.description}
                                    topics={item.recipeData.topics}
                                    $createdAt={item.recipeData.$createdAt}
                                />
                            </View>
                        )}
                        style={spacings.mt10}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    main: {
        flex: 1,
    },
});

export default HistoryScreen;