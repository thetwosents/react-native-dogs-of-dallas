import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const DogScreen = ({navigation}) => {
  const dogCollection = useSelector(state=>state.dogCollection.dogCollection);
  const myDogs = useSelector(state=>state.user.myDogs); 

  const [dogs, setDogs] = useState([]);

  const dispatch = useDispatch();

  useEffect(()=>{
    let arr = [];
    Object.keys(myDogs).forEach(key=>{
      // Find in the dogCollection
      let dog = dogCollection.find(dog=>dog.id===key);
      if (dog) {
        arr.push(dog);
      }
    })
    setDogs(arr);
  },[myDogs])

  useEffect(()=>{
    console.log('dogs', dogs);
  },[dogs])

  return (
    <View style={styles.container}>
      <Text>Dog Screen</Text>
      <StatusBar style="auto" />
      <View>
        <Text>My Dogs</Text>
      {
        dogs.length > 0 ?
        dogs.map((dog, index)=>{
          return (
            <View key={index}>
              <Text>{dog.name}</Text>
            </View>
          )
        })
        :
        <Text>No dogs</Text>
      }
      </View>
      {
        dogCollection.map((dog, index) => {
          return (
            <View key={index} style={styles.dogContainer}>
              <Text style={styles.dogName}>{dog.name}</Text>
              <Text style={styles.dogAge}>{dog.age}</Text>
              {/* Button to add dog to your collection */}
              <Button
                title="Add to My Dogs"
                onPress={() => {
                  dispatch({
                    type: 'ADD_DOG_TO_COLLECTION',
                    dog: dog,
                    user: window.user
                  });
                }
                }
              />
            </View>
          );
        })
      }
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
export default DogScreen;