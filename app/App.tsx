import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { CulinaFonts } from './assets/assets';
import Router from './navigate/Router';
import GlobalProvider from './utils/GlobalProvider';

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
