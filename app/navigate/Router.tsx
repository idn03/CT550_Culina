import { CopilotProvider } from 'react-native-copilot';
import { NavigationContainer } from '@react-navigation/native';
import { TourToolTip } from '@/components';
import StackNavigator from './StackNavigator';
import { View } from 'react-native';

const Router = () => {
    return (
        <NavigationContainer>
            <CopilotProvider
                overlay="svg"
                tooltipComponent={TourToolTip}
                tooltipStyle={style}
                backdropColor="#00000080"
                stepNumberComponent={View}
            >
                <StackNavigator />
            </CopilotProvider>
        </NavigationContainer>
    );
};

const style = {
    borderRadius: 12,
};

export default Router;