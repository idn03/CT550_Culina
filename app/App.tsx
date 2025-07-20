import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import { CulinaFonts } from '@assets/index';
import Router from '@navigate/Router';
import GlobalProvider from '@utils/GlobalProvider';
import { connectToAIServer } from './services/axios';

LogBox.ignoreLogs(['TurboModuleRegistry']);

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [fontsLoaded] = CulinaFonts();

    useEffect(() => {
        async function prepare() {
            try {
                const isConnected = await connectToAIServer();
                if (!isConnected) {
                    console.error('Failed to connect to server');
                    return;
                }
                if (fontsLoaded) {
                    setAppIsReady(true);
                }
            } catch (error) {
                console.error('Error during app preparation:', error);
            }
        }
        prepare();
    }, [fontsLoaded]);

    if (!appIsReady) { return null; }

    return (
        <GlobalProvider>
            <StatusBar style="dark" />
            <Router />
        </GlobalProvider>
    );
}
