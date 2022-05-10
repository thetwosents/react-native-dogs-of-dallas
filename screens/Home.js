import { View, Text, StyleSheet, Button, StatusBar, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import Swiper from 'react-native-swiper/src';
import { getAuth } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import database from '../firebase';

const HomeScreen = ({ navigation }) => {
  const user = useSelector(state => state.user);
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
    console.log('user', user);
  }, [user]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View>
        <Text style={{ fontSize: 48, fontWeight: 'bold', marginTop: 64, marginBottom: 12, paddingLeft: 10 }}>Home</Text>

        <Text>My Dogs</Text>
        <Swiper showsButtons={false} autoplay={false} style={{ height: 240 }}>
          {
            user.myDogs &&
            user.dogs &&
            user.dogs.length > 0 &&
            user.dogs.map(dog => {
              return (
                <Dog key={dog.id} dog={dog} />
              )
            })
          }
        </Swiper>

        <Text>My Parks</Text>

        <Swiper showsButtons={false} autoplay={false} style={{ height: 240 }}>
          {
            user.myParks &&
            user.parks &&
            user.parks.length > 0 &&
            user.parks.map(park => {
              return (
                <Park key={park.id} park={park} />
              )
            })
          }
        </Swiper>
      </View>
    </View>
  );
}


const Dog = ({dog}) => {
  return (
    <View style={{ flexDirection: 'column', marginBottom: 10, flex: 1 }}>
      <Image source={{ uri: dog.image || 'https://placedog.net/500' }} style={{ width: '100%', height: 240 }} />
      <Text>{dog.name}</Text>
    </View>
  )
}

const Park = ({park}) => {
  return (
    <View style={{ flexDirection: 'column', marginBottom: 10, flex: 1 }}>
      <Text>{park.name}</Text>
      <Text>{park.dogs ? Object.keys(park.dogs).length : 0} dogs at park</Text>
      <Image source={{ uri: park.featured_image || 'https://placedog.net/500' }} style={{ width: '100%', height: 240 }} />
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
});


export default HomeScreen;