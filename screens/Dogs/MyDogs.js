import {View, Text, StyleSheet, Button, StatusBar} from 'react-native';
import React, {useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

const MyDogsScreen = ({ navigation }) => {
  const dogCollection = useSelector(state => state.dogCollection.dogCollection);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('MyDogsScreen: useEffect');
  }, []);
  return (
    <View style={styles.container}>
      <Text>My Dogs Screen</Text>
      <StatusBar style="auto" />
      {
        dogCollection && dogCollection.length > 0 ? (
          dogCollection.map((dog, index) => {
            return (
              <View key={index}>
                <Text>{dog.name}</Text>
                {/* Breed */}
                <Text>{dog.breed}</Text>
                <Button
                  title="View Profile"
                  onPress={() => navigation.navigate('Dog Profile Screen', {dog: dog})}
                />
                
                <Button
                  title="Remove"
                  onPress={() => dispatch({type: 'REMOVE_DOG', index})}
                />
              </View>
            );
          })
        ) : (
          <Text>You have no dogs!</Text>
        )
      }
      <Button
        title="Go to Dogs"
        onPress={() => navigation.navigate('Dog Screen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyDogsScreen;