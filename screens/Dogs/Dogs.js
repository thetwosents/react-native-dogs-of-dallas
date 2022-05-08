import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { useSelector, useDispatch } from 'react-redux';

const DogScreen = ({navigation}) => {
  const dogCollection = useSelector(state=>state.dogCollection.dogCollection || []);
  const myDogs = useSelector(state=>state.user.myDogs || []);

  const [dogs, setDogs] = useState([]);

  const dispatch = useDispatch();

  useEffect(()=>{
    let arr = [];
    Object.keys(myDogs).forEach(key=>{
      let dog = dogCollection.find(dog=>dog.id===key);
      if (dog) {
        arr.push(dog);
      }
    })
    setDogs(arr);
  },[myDogs])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View>
      </View>
      <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView>
      <Text style={{fontSize:48, fontWeight: 'bold', marginTop: 64, marginBottom: 12, paddingLeft: 10}}>Dogs</Text>
      <MasonryList
        data={dogCollection}
        keyExtractor={(item, index) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <CardItem item={item} navigation={navigation} />}
      />
      </ScrollView>
      
    </View>
    </View>
  );
}

const CardItem = ({ item, navigation }) => {
  let largeOrSmall = 'small';
  if (Math.random() > 0.5) {
    largeOrSmall = 'large';
  }
  item.featured_image = 'https://placedog.net/500';
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dog Profile Screen', {
          dog: item,
        });
      }
      }
      >
    <View style={styles.card}>
      <Image resizeMode="cover" source={{ uri: item.image || item.featured_image }} style={(largeOrSmall === 'large') ? styles.cardImageLarge : styles.cardImageSmall} />
      <View style={styles.cardContent}>
      <Text style={styles.breed}>{item.breed}</Text>
      <Text style={styles.cardTitle}>{item.name}</Text>
      </View>
      {/* Breed */}
      
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
  breed: {
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
    paddingBottom: 10,
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
export default DogScreen;