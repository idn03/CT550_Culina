import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CopilotStep, walkthroughable } from "react-native-copilot";
import { Header } from '@components/index';
import SearchBar from './SearchBar';
import Newfeed from './Newfeed';
import SearchResult from './SearchResult';

const WalkthroughableView = walkthroughable(View);

const HomeScreen = () => {
    const [searchParams, setSearchParams] = useState<{
        q: string;
        ls: number;
        hs: number;
        t: string[];
        a: boolean;
    }>({
        q: '',
        ls: 0,
        hs: 10,
        t: [],
        a: false,
    });

    return (
        <View style={styles.container}>
            <CopilotStep
                text="Welcome to Culina 2! 
                Discover the latest recipes on the Home screen. Tap the dashboard icon at the top-left to open the drawer menu."
                order={1}
                name="Home"

            >
                <WalkthroughableView>
                    <Header>Home</Header>
                </WalkthroughableView>
            </CopilotStep>

            <CopilotStep
                text="You can use this search bar to find recipes by name or ingredients. You can also filter by rating and topic."
                order={2}
                name="Search Bar"
            >
                <WalkthroughableView>
                    <SearchBar onSearch={(q, ls, hs, t, a) => setSearchParams({ q, ls, hs, t, a })} />
                </WalkthroughableView>
            </CopilotStep>

            {searchParams.q !== "" ?
                <SearchResult {...searchParams} />
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