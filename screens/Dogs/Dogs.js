import { useEffect } from 'react';
import { View, Text, StyleSheet, Button, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const DogScreen = ({navigation}) => {
  const dogCollection = useSelector(state=>state.dogCollection.dogCollection);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('DogScreen: useEffect', dogCollection);
  }, [dogCollection]);
  return (
    <View style={styles.container}>
      <Text>Dog Screen</Text>
      <StatusBar style="auto" />
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
                    user: {
                      id: 1,
                      name: 'Jon'
                    }
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