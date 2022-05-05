import { View, Text, StyleSheet, Button, StatusBar, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useEffect } from 'react';

const ParkScreen = ({ navigation }) => {
  const parkCollection = useSelector(state => state.parkCollection.parkCollection);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('ParkScreen: useEffect', parkCollection);
  }, [parkCollection]);

  // Group all parks by Neighborhood
  const parksByNeighborhood = {};
  parkCollection.forEach(park => {
    if (parksByNeighborhood[park.neighborhood]) {
      parksByNeighborhood[park.neighborhood].push(park);
    } else {
      parksByNeighborhood[park.neighborhood] = [park];
    }

    park.dogs = park.dogs || [];
    
    // Check in park.dogs for expired dogs and remove them
    park.dogs.forEach(dog => {
      if (dog.expires < new Date()) {
        dispatch({
          type: 'REMOVE_DOG_FROM_PARK',
          payload: dog.id
        });
      }
    })
  });

  // Sort parks by name
  const parksByName = Object.keys(parksByNeighborhood).map(key => {
    return {
      name: key,
      parks: parksByNeighborhood[key].sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }),
    };
  });

  if (parksByName.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No parks found</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Dog Parks by Neighborhood</Text>
      <StatusBar style="auto" />
      <ScrollView>
      {
        parksByName.map((parkGroup, index) => (
          <View style={{width: '100%'}} key={index}>
            <Text>Neighborhood: {parkGroup.name}</Text>

            {
              parkGroup.parks.map((park, index) => (
                <View key={index} style={styles.park}>
                  
                  <Image source={{ uri: park.featured_image }} style={{ width: '100%', height: 200 }} />
                  <Text>{park.name}</Text>
                  <Text>Number of dogs at park: {park.dogs.length}</Text>
                  {/* Latest check in */}
                  {
                    park.dogs.length > 0 &&
                    <Text>Latest check in: {moment(park.dogs[0].timestamp).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                  }
                  


                  <Button
                    title="Go to Park Detail"
                    onPress={() => navigation.navigate('Park Detail Screen', { park })}
                  />
                </View>
              ))
            }
          </View>
        ))
      }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  park: {
    width: '95%',
    marginBottom: 20,
    margin: 'auto',
  }
});
export default ParkScreen;