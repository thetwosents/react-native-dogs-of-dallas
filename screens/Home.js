import { View, Text, StyleSheet, Button, StatusBar, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import Swiper from 'react-native-swiper/src'; 
import { getAuth } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import database from '../firebase';

const HomeScreen = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [dogs, setDogs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      if (user) {
        dispatch({ type: 'USER_SIGNED_IN', user });
        get(ref(database, `users/${user.uid}`)).then(user => {
          dispatch({ type: 'GET_MY_DOGS', user: user.val() });
          dispatch({ type: 'GET_MY_PARKS', user: user.val() });
        });
      }
    })
  }, []);

  useEffect(() => {
    if (user) {

    }
  }, [user]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View>
        <Text style={{fontSize:48, fontWeight: 'bold', marginTop: 64, marginBottom: 12, paddingLeft: 10}}>Home</Text>
      </View>

      {/* Button to navigate to add dog screen */}
      <Button title="Add Dog" onPress={() => {
        navigation.navigate('Dogs',{screen: 'Add Dog Screen'});
      }} />
    
      
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

const Dog = (dog) => {
  return (
    <View>
      <Image source={{ uri: dog.featured_image }} style={{ width: '100%', height: 240}} />
      <Text>{dog.name}</Text>
    </View>
  )
}

export default HomeScreen;