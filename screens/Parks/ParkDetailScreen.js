import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, StatusBar, Image, ScrollView } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list'; 
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

// Should query my dogs, the park details, and the dogs at the park
const ParkDetailScreen = ({ route, navigation }) => {
  const { park } = route.params;
  const [isFavorited,setIsFavorited] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const myDogs = useSelector(state => state.user.myDogs);
  const selectedPark = useSelector(state => state.parkCollection.selectedPark); 

  useEffect(() => {
      dispatch({ type: 'GET_PARK_BY_ID', parkId: park.id });
  }, []);

  useEffect(() => {
    if (selectedPark) {
      console.log('Selected Park', selectedPark)
    }
  }, [selectedPark]);

  useEffect(() => {
    if (user) {
      Object.keys(user.myParks).forEach(key => {
        if (key === park.id) {
          setIsFavorited(true);
        }
      })
    }
  },[user]);



  const checkInDogs = () => {
    if (Object.keys(myDogs).length > 0) {
      Object.keys(myDogs).forEach(dogId => {
        dispatch({ type: 'CHECK_IN_AT_PARK', parkId: park.id, dogId: dogId });
      });
    }
  }
  if (!selectedPark) {
    return null;
  }
  return (
    <View>
      <StatusBar style="auto" />      
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: park.featured_image }} style={styles.image} />
        </View>
        
        <View style={styles.infoContainer}>
          {/* Neighborhood */}
          <Text style={styles.infoTitle}>{park.neighborhood}</Text>
        <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 4, marginBottom: 12, paddingLeft: 0 }}>{park.name}</Text>

        {
          selectedPark.dogs &&
          <View style={styles.dogsContainer}>
            <Text style={styles.dogsTitle}>Dogs at Park</Text>
            <View style={styles.dogsList}>
              {
                selectedPark.dogs.map(dog => {
                  return (
                    <View key={dog.id} style={styles.dogContainer}>
                      <Image source={{ uri: dog.featured_image || 'https://placedog.net/500' }} style={{width: 64, height: 64}} />
                      <Text style={styles.dogName}>{dog.name}</Text>
                      <Text>{dog.timestamp}</Text>
                    </View>
                  );
                })
              }
            </View>
          </View>
        }
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
        {/* Conditional if the parkId is included in user.myParks {} */}
          {
            !isFavorited &&
            <Button
              title="Add to My Parks"
              onPress={() => dispatch({ type: 'ADD_PARK_TO_COLLECTION', user: user.uid, park: park })} />
          }

          {
            isFavorited &&
            <Button
              title="Unfavorite"
              onPress={() => dispatch({ type: 'REMOVE_PARK_FROM_COLLECTION', user: user.uid, park: park })} />
          }
        <Button
          title="Check in at Park"
          onPress={() => checkInDogs()}
        />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: 240,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    marginBottom:0,
    marginTop: 0
  },
  infoContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default ParkDetailScreen;