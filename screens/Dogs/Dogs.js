import { useEffect } from 'react';
import { View, Text, StyleSheet, Button, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const dogNames = [
  'Bella',
  'Buddy',
  'Buster',
  'Cali',
  'Charlie',
];

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
              {/* Show if claimed or not */}
              {dog.claimed ? (
                <Text style={styles.dogClaimed}>Claimed</Text>
              ) : (
                <Text style={styles.dogNotClaimed}>Not Claimed</Text>
              )}
              
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