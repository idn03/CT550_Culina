import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';

const Router = () => {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );
};

export default Router;