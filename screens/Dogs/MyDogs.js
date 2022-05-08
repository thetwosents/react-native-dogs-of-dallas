import {View, Text, StyleSheet, Button, StatusBar} from 'react-native';
import React, {useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

const MyDogsScreen = ({ navigation }) => {
  const dogCollection = useSelector(state => state.user.myDogs || []);
  const parkCollection = useSelector(state => state.user.myParks || []);
  const packCollection = useSelector(state => state.user.myPacks || []);
  
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('MyDogsScreen: useEffect');
  }, []);
  return (
    <View style={styles.container}>
      <Text>My Dogs Screen</Text>
      <StatusBar style="auto" />
      
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