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
  const dogCollection = useSelector(state=>state.dogCollection);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>Dog Screen</Text>
      <StatusBar style="auto" />
      {dogNames.map((name) => (
        <Button
          key={name}
          title={name}
          onPress={() => dispatch({type: 'ADD_DOG', dog: {name: name}})}
        />
      ))}
      <Button
        title="Go to My Dogs"
        onPress={() => navigation.navigate('My Dogs Screen')}
      />
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