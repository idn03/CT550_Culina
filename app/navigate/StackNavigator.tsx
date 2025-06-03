import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from '@/screens/Loading';
import DrawerNavigator from './DrawerNavigator';
import SignUpScreen from '@screens/SignUp';
import LoginScreen from '@screens/Login';
import RecipeDetailScreen from '@screens/recipeLayout/recipeDetail/RecipeDetail';
import EditProfileScreen from '@screens/editProfile/EditProfile';
import EditRecipeScreen from '@screens/recipeLayout/editRecipe/EditRecipe';
import { useGlobalContext } from '@utils/GlobalProvider';

export type StackParamList = {
    Loading: undefined;
    Login: undefined;
    SignUp: undefined;
    Drawer: undefined;
    RecipeDetail: { recipeId: string };
    EditProfile: undefined;
    EditRecipe: { recipeId: string };
};

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Loading"
            screenOptions={({ route }) => ({
                headerShown: false,
                animation: route.name === "Login" ? 'slide_from_left' : 'slide_from_right',
            })}
        >
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen name="Drawer" component={DrawerNavigator} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen 
                name="RecipeDetail" 
                component={RecipeDetailScreen}
                initialParams={{ recipeId: '' }} 
            />
            <Stack.Screen 
                name="EditRecipe"
                component={EditRecipeScreen}
                initialParams={{ recipeId: '' }}
            />
        </Stack.Navigator>
    );
};

export default StackNavigator;