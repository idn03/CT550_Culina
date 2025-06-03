import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from '@components/index';
import SearchBar from './SearchBar';
import Newfeed from './Newfeed';
import SearchResult from './SearchResult';

const HomeScreen = () => {
    const [query, setQuery] = useState<string>("");
    const [lowScore, setLowScore] = useState(0);
    const [highScore, setHighScore] = useState(8);
    const [topics, setTopics] = useState<string[]>([]);
    const [advance, setAdvance] = useState(false);

    const handleSearch = (query: string, lowScore: number, highScore: number, topics: string[], advance: boolean) => {
        setQuery(query);
        setLowScore(lowScore);
        setHighScore(highScore);
        setTopics(topics);
        setAdvance(advance);
        console.log("User searched for: ", query, lowScore, highScore, topics, advance);
    };

    return (
        <View style={styles.container}>
            <Header>Home</Header>

            <SearchBar onSearch={handleSearch} />

            {query !== "" ?
                <SearchResult q={query} ls={lowScore} hs={highScore} t={topics} a={advance} />
                :
                <Newfeed />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        position: 'relative',
        backgroundColor: '#FFF',
    },
});

export default HomeScreen;