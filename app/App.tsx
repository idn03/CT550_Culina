import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { CulinaFonts } from './assets/assets';

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [fontsLoaded] = CulinaFonts();

    useEffect(() => {
        async function prepare() {
            if (fontsLoaded) {
                setAppIsReady(true);
            }
        }
        prepare();
    }, [fontsLoaded]);

    if (!appIsReady) { return null; }

    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
