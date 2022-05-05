import { View, Text, StyleSheet, Button, StatusBar, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MasonryList from '@react-native-seoul/masonry-list';
import moment from 'moment';
import { useEffect } from 'react';

const ParkScreen = ({ navigation }) => {
  const parkCollection = useSelector(state => state.parkCollection.parkCollection);
  const dispatch = useDispatch();
  
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
      <MasonryList
        data={parkCollection}
        keyExtractor={(item, index) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <CardItem item={item} />}
      />
      
    </View>
  );
}

const CardItem = ({ item }) => {
  let largeOrSmall = 'small';
  if (Math.random() > 0.5) {
    largeOrSmall = 'large';
  }

  return (
    <View style={styles.card}>
      <Image resizeMode="cover" source={{ uri: item.featured_image }} style={(largeOrSmall === 'large') ? styles.cardImageLarge : styles.cardImageSmall} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.checkin}>Number of dogs at park: {item.dogs.length}</Text>
      {/* Latest check in */}
      {
        item.dogs.length > 0 &&
        <Text style={styles.checkin}>Latest check in: {moment(item.dogs[0].timestamp).format('MMMM Do YYYY, h:mm:ss a')}</Text>
      }
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
  park: {
    width: '95%',
    marginBottom: 20,
    margin: 'auto',
  },
  card: {
    marginTop: 0, flex: 1, paddingTop: 10, paddingBottom: 0, paddingLeft: 6, paddingRight: 6, backgroundColor: '#fff'
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 2,
  },
  cardImageLarge: {
    borderRadius: 12,
    alignSelf: 'stretch', height: 200,
  },
  checkin: {
    fontSize: 10,
    fontStyle: 'italic',
    marginTop: 0,
    marginBottom: 12,
  },
  cardImageSmall: {
    borderRadius: 12,
    alignSelf: 'stretch', height: 100,
  },
});
export default ParkScreen;