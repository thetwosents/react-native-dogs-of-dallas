import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ParkScreen from '../screens/Parks';
import DogScreen from '../screens/Dogs/Dogs';

const Tab = createBottomTabNavigator();

function NavTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Parks" component={ParkScreen} />
      <Tab.Screen name="Dogs" component={DogScreen} />
    </Tab.Navigator>
  );
}

export default NavTabs;