import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Loading } from '@/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackParamList } from '@/navigate/StackNavigator';
import { useGlobalContext } from '@/utils/GlobalProvider';
import { getData, StorageKeys } from '@/services/api/asyncStorage';
import { getCurrentUser } from '@/services/api/auth';

const LoadingScreen = () => {
    const navigation: NavigationProp<StackParamList> = useNavigation();
    const { setIsLoggedIn, setUser } = useGlobalContext();
    
    useEffect(() => {
        const checkAuth = async () => {
            const rememberMe = await getData(StorageKeys.REMEMBER_ME);
            const storedAccountId = await getData(StorageKeys.accountId);

            if (rememberMe === 'true' && storedAccountId) {
                try {
                    const user = await getCurrentUser();
                    if (user && user.$id === storedAccountId) {
                        setIsLoggedIn(true);
                        setUser({ $id: user.$id, email: user.email });
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Drawer' }],
                        });
                        return;
                    }
                } catch (error) {
                    console.error('Auto login failed:', error);
                }
            }
            
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        };

        checkAuth();
    }, []);

    return (
        <View style={styles.container}>
            <Loading />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
});

export default LoadingScreen;