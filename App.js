import React from 'react';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from './screens/Home';
import YourCollectionScreen from './screens/Collection';

// Dogs
import AddDogScreen from './screens/Dogs/AddDog';
import DogProfileScreen from './screens/Dogs/DogProfile';
import DogScreen from './screens/Dogs/Dogs';
import MyDogsScreen from './screens/Dogs/MyDogs';

// Packs
import PacksScreen from './screens/Packs';


// Parks
import ParksScreen from './screens/Parks';
import ParkDetailScreen from './screens/Parks/ParkDetailScreen';

// Global State
import { Provider } from 'react-redux';
import { store } from './store';

// Notifications 
import GlobalNotification from './components/Notification';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store} >
      <GlobalNotification />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />

          {/* Dogs */}
          <Stack.Screen name="Your Collection" component={YourCollectionScreen} />
          <Stack.Screen name="Dog Screen" component={DogScreen} />
          <Stack.Screen name="My Dogs Screen" component={MyDogsScreen} />
          <Stack.Screen name="Add Dog Screen" component={AddDogScreen} />
          <Stack.Screen name="Dog Profile Screen" component={DogProfileScreen} />

          {/* Parks */}
          <Stack.Screen name="Parks Screen" component={ParksScreen} />
          <Stack.Screen name="Park Detail Screen" component={ParkDetailScreen} />

          {/* Packs */}
          <Stack.Screen name="Packs Screen" component={PacksScreen} />


        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

