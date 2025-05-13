import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import { CulinaFonts } from './assets/assets';
import { database, client } from './services/appwrite';
import Router from './navigate/Router';
import GlobalProvider from './utils/GlobalProvider';

LogBox.ignoreLogs(['TurboModuleRegistry']);

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
        <GlobalProvider>
            <StatusBar style="dark"/>
            <Router />
        </GlobalProvider>
    );
}
