import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from '@components/index';
import SearchBar from './SearchBar';
import Newfeed from './Newfeed';
import SearchResult from './SearchResult';

const HomeScreen = () => {
    const [query, setQuery] = useState<string>("");

    const handleSearch = (query: string) => {
        setQuery(query);
        console.log("User searched for:", query);
    };

    return (
        <View style={styles.container}>
            <Header>Home</Header>

            <SearchBar onSearch={handleSearch} />

            {query !== "" ? <SearchResult q={query} /> : <Newfeed />}
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