// System Libs
import { createDrawerNavigator } from '@react-navigation/drawer';

// Components
import { CulinaDrawer } from '@components/index';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import HelpScreen from '@screens/drawerChildren/Help';
import AboutUsScreen from '@screens/drawerChildren/AboutUs';
import BottomTabsNavigator from './BottomTabsNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
	return (
		<Drawer.Navigator
			initialRouteName="Home"
			drawerContent={(props) => <CulinaDrawer {...props} />}
			screenOptions={{
				drawerStyle: {
					backgroundColor: '#FFF',
					width: 300,
				},
				drawerLabelStyle: {
					fontFamily: 'InriaSans-Regular',
					fontSize: 16,
					color: '#333',
				},
				headerShown: false,
			}}
		>
			<Drawer.Screen 
				name="Home" 
				component={BottomTabsNavigator} 
				options={{
					drawerIcon: () => (
						<Entypo name="book" size={24} color="#333"/>
					),
				}}
			/>
			<Drawer.Screen 
				name="Help" 
				component={HelpScreen} 
				options={{
					drawerIcon: () => (
						<MaterialIcons name="help" size={24} color="#333" />
					),
				}}
			/>
			<Drawer.Screen 
				name="About Us" 
				component={AboutUsScreen} 
				options={{
					drawerIcon: () => (
						<FontAwesome name="lightbulb-o" size={24} color="#333" style={{marginLeft: 4}} />
					),
				}}
			/>
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;