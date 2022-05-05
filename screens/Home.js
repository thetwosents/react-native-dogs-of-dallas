import { View, Text, StyleSheet, Button, StatusBar } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import React, {useState,useEffect} from 'react';

const HomeScreen = ({ navigation }) => {
  const dogCollection = useSelector(state=>state.dogCollection.dogCollection);
  const parkCollection = useSelector(state=>state.parkCollection.parkCollection);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('HomeScreen: useEffect');
  }, []);
  useEffect(() => {
    console.log('DogCollection: useEffect', dogCollection);
  }, [dogCollection]);

  useEffect(() => {
    console.log('ParkCollection: useEffect', parkCollection);
  }, [parkCollection]);
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <StatusBar style="auto" />
      <Text>Stats</Text>
      <Text>Number of dogs in collection: {dogCollection.length}</Text>   
      <Text>Number of parks in collection: {parkCollection.length}</Text>
      
      <Text>Dogs</Text>
      <Button
        title="Go to Dogs"
        onPress={() => navigation.navigate('Dog Screen')}
      />
      <Button
        title="Go to My Dogs"
        onPress={() => navigation.navigate('My Dogs Screen')}
      />
      <Button
        title="Add Dog"
        onPress={() => navigation.navigate('Add Dog Screen')}
      />

      <Text>Parks</Text>
      <Button
        title="Go to Parks"
        onPress={() => navigation.navigate('Parks Screen')}
      />

      <Text>Packs</Text>
      <Button
        title="Go to Packs"
        onPress={() => navigation.navigate('Packs Screen')}
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

export default HomeScreen;