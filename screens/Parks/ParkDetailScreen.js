import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, StatusBar } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

const ParkDetailScreen = ({ route, navigation }) => {
  const { park } = route.params;
  const parkCollection = useSelector(state => state.parkCollection);
  const dispatch = useDispatch();

  // Get my dogs
  const myDogs = useSelector(state => state.user.myDogs);

  const checkInDogs = () => {
    // Check in dogs
    myDogs.forEach(dog => {
      dispatch({
        type: 'CHECK_IN_AT_PARK',
        park,
        dog,
        timestamp: new Date().getTime(),
      });
    });

    // Dispatch a notification
    dispatch({
      type: 'ADD_NOTIFICATION',
      notification: {
        title: 'Checked in',
        message: `You checked in ${myDogs.length} dog(s) at ${park.name}`,
        timestamp: new Date().getTime(),
      }
    });
  }

  return (
    <View>
      <Text>ParkDetailScreen</Text>
      <Text>{park.name}</Text>
      {
        park.dogs.length > 0 ? (
          <Text>Number of dogs at park: {park.dogs.length}</Text>
        ) : (
          <></>
        )
      }

      {
        park.dogs.length > 0 ? (
          park.dogs.map((dog, index) => (
            <View key={index}>
              <Text>{dog.name}</Text>
              {/* When they checked in */}
              <Text>Checked in at {moment(dog.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</Text>
            </View>
          ))
        ) : (
          <Text>No dogs at park</Text>
        )
      }

      <Button
        title="Go to My Parks"
        onPress={() => navigation.navigate('My Parks Screen')}
      />
      <Button
        title="Heading to park in 10 minutes"
        onPress={() => dispatch({
          type: 'ADD_NOTIFICATION',
          notification: {
            title: 'Heading to park',
            message: `You are heading to ${park.name} in 10 minutes`,
            timestamp: new Date().getTime(),
          }
        })}
      />
      <Button
        title="Add to My Parks"
        onPress={() => dispatch({ type: 'ADD_PARK_TO_COLLECTION', user: window.user,park:  park })} />
      <Button
        title="Check in at Park"
        onPress={() => checkInDogs()}
      />
    </View>
  );
}

export default ParkDetailScreen;