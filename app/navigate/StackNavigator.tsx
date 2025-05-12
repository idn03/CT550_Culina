import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './../screens/SignUp';
import LoginScreen from './../screens/Login';
import DrawerNavigator from './DrawerNavigator';
import RecipeDetailScreen from './../screens/recipeLayout/recipeDetail/RecipeDetail';
import EditProfileScreen from './../screens/editProfile/EditProfile';
import EditRecipeScreen from './../screens/recipeLayout/editRecipe/EditRecipe';
import { useGlobalContext } from './../utils/GlobalProvider';

export type StackParamList = {
    Login: undefined;
    SignUp: undefined;
    Drawer: undefined;
    RecipeDetail: { recipeId: string };
    EditProfile: undefined;
    EditRecipe: { recipeId: string };
};

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator = () => {
    const { isLoggedIn } = useGlobalContext();

    return (
        <Stack.Navigator
            initialRouteName={isLoggedIn ? "Drawer" : "Login"}
            screenOptions={({ route }) => ({
                headerShown: false,
                animation: route.name === "Login" ? 'slide_from_left' : 'slide_from_right',
            })}
        >
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