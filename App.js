import React, { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FoundationIcons from 'react-native-vector-icons/Foundation';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import HomeScreen from './screens/Home';

// Dogs
import AddDogScreen from './screens/Dogs/AddDog';
import DogProfileScreen from './screens/Dogs/DogProfile';
import DogScreen from './screens/Dogs/Dogs';
import MyDogsScreen from './screens/Dogs/MyDogs';

// Parks
import ParksScreen from './screens/Parks';
import ParkDetailScreen from './screens/Parks/ParkDetailScreen';

// Global State
import { Provider } from 'react-redux';
import { store } from './store';

// Notifications 
import GlobalNotification from './components/Notification';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    store.dispatch({ type: 'GET_DOGS' });
    store.dispatch({ type: 'GET_PARKS' });
  }, []);
  return (
    <Provider store={store} >
      <GlobalNotification />

      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Parks') {
              iconName = focused
                ? 'trees'
                : 'trees';

              return <FoundationIcons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Dogs') {
              iconName = focused ? 'ios-paw' : 'ios-paw-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Packs') {
              iconName = focused ? 'ios-heart' : 'ios-heart-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Home') {
              iconName = focused ? 'ios-trophy' : 'ios-trophy-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Messages') {
              iconName = focused ? 'ios-chatbox-ellipses' : 'ios-chatbox-ellipses-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } 
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
          tabBarLabel: route.name,
        })}>
          <Tab.Screen name="Home" component={MainStackNavigator} />
          <Tab.Screen name="Parks" component={ParkStackNavigator} />
          <Tab.Screen name="Packs" component={MainStackNavigator} />
          <Tab.Screen name="Dogs" component={DogStackNavigator} />          
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const MainStackNavigator = () => (
  <Stack.Navigator screenOptions={{
    headerShown: false
  }} >
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

const DogStackNavigator = () => (
  <Stack.Navigator screenOptions={{
    headerShown: false
  }} >
    <Stack.Screen name="Dogs" component={DogScreen} />
    <Stack.Screen name="Add Dog Screen" component={AddDogScreen} />
    <Stack.Screen name="Dog Profile Screen" component={DogProfileScreen} />
  </Stack.Navigator>
);

const ParkStackNavigator = () => (
  <Stack.Navigator screenOptions={{
    headerShown: false
  }} >
    <Stack.Screen name="Parks" component={ParksScreen} />
    <Stack.Screen name="Park Detail Screen" component={ParkDetailScreen} />
  </Stack.Navigator>
);

const Profile = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }} >
      <Stack.Screen name="MyDogsScreen" component={MyDogsScreen} />
    </Stack.Navigator>
  );

}