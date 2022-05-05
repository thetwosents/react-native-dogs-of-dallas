// React native component to add a dog to the collection
// Language: javascript

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, StatusBar, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const AddDogScreen = ({navigation}) => {
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('AddDogScreen: useEffect');
  }, [dogName]);

  return (
    <View style={styles.container}>
      <Text>Add Dog Screen</Text>
      <StatusBar style="auto" />
      <Text>Enter a dog name:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setDogName(text)}
        value={dogName}
      />
      {/* Breed text field */}
      <Text>Enter a breed:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setBreed(text)}
        value={breed}
      />
      <Button
        title="Add Dog"
        onPress={() => dispatch({type: 'ADD_DOG', dog: {name: dogName, breed: breed}})}
      />
      <Button
        title="Go to My Dogs"
        onPress={() => navigation.navigate('My Dogs Screen')}
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
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    width: 200,
    height: 40,
    margin: 10,
  },
});

export default AddDogScreen;