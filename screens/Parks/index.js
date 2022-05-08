import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MasonryList from '@react-native-seoul/masonry-list';
import moment from 'moment';
import { useEffect } from 'react';

const ParkScreen = ({ navigation }) => {
  const parkCollection = useSelector(state => state.parkCollection.parkCollection || [])
  const dispatch = useDispatch();
  
  // Group all parks by Neighborhood
  const parksByNeighborhood = {};
  parkCollection.forEach(park => {
    if (parksByNeighborhood[park.neighborhood]) {
      parksByNeighborhood[park.neighborhood].push(park);
    } else {
      parksByNeighborhood[park.neighborhood] = [park];
    }

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
      <StatusBar style="auto" />
      <ScrollView>
      <Text style={{fontSize:48, fontWeight: 'bold', marginTop: 64, marginBottom: 12, paddingLeft: 10}}>Parks</Text>
      <MasonryList
        data={parkCollection}
        keyExtractor={(item, index) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <CardItem item={item} navigation={navigation} />}
      />
      </ScrollView>
      
    </View>
  );
}

const CardItem = ({ item, navigation }) => {
  let largeOrSmall = 'small';
  if (Math.random() > 0.5) {
    largeOrSmall = 'large';
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Park Detail Screen', {
          park: item,
        });
      }
      }
      >
    <View style={styles.card}>
      <Image resizeMode="cover" source={{ uri: item.featured_image }} style={(largeOrSmall === 'large') ? styles.cardImageLarge : styles.cardImageSmall} />
      <View style={styles.cardContent}>
        {/* Neighborhood */}
        <Text style={styles.neighborhood}>{item.neighborhood}</Text>
        <Text style={styles.cardTitle}>{item.name}</Text>
        
        <Text style={styles.checkin}>Number of dogs at park: {item.dogs ? Object.keys(item.dogs).length : 0}</Text>
        <Text style={styles.checkin}>Last check-in: {item.dogs ? moment(item.dogs[Object.keys(item.dogs)[0]].timestamp).format('MMMM Do YYYY, h:mm:ss a') : 'No check-ins yet'}</Text>
      </View>
    </View>
    </TouchableOpacity>
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
    marginTop: 0, flex: 1, paddingTop: 8, paddingBottom: 0, paddingLeft: 8, paddingRight: 8, backgroundColor: '#fff'
  },
  neighborhood: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 12,
    marginBottom: 4,
  },
  cardContent: {
    flex: 1,
    padding: 6,
    paddingTop: 0,
    paddingBottom: 0,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    
    marginBottom: 2,
  },
  cardImageLarge: {
    borderRadius: 6,
    alignSelf: 'stretch', 
    height: 200,
  },
  checkin: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#999',
    marginTop: 0,
    marginBottom: 12,
  },
  cardImageSmall: {
    borderRadius: 6,
    alignSelf: 'stretch', 
    height: 100
  },
});
export default ParkScreen;