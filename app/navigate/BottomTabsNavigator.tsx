import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabs from '@components/override/BottomTabs';
import HomeScreen from '@screens/home/Home';
import AIChefScreen from '@screens/aichef/AIChef';
import AddNewRecipe from '@screens/recipeLayout/addRecipe/AddNewRecipe';
import AchievementsScreen from '@screens/achievements/Achievements';
import ProfileScreen from '@screens/profile/Profile';

export type BottomTabsParamList = {
    Main: undefined;
    AIchef: undefined;
    AddRecipe: undefined;
    Achievements: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();

const BottomTabsNavigator = () => {
    return (
        <Tab.Navigator 
            tabBar={(props) => <BottomTabs {...props} />}
            screenOptions={{headerShown: false,}}
        >
            <Tab.Screen name="Main" component={HomeScreen} />
            <Tab.Screen name="AIchef" component={AIChefScreen} />
            <Tab.Screen name="AddRecipe" component={AddNewRecipe} />
            <Tab.Screen name="Achievements" component={AchievementsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabsNavigator;