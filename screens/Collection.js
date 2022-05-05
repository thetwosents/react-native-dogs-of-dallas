import { View, Text, StyleSheet, Button, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';

const YourCollectionScreen = ({navigation}) => {
  const dogCollection = useSelector(state=>state.dogCollection);
  return (
    <View style={styles.container}>
      <Text>Your Collection Screen</Text>
      <StatusBar style="auto" />
      {dogCollection.map((dog) => (
        <Text key={dog.id}>{dog.name}</Text>
      ))}
      <Button
        title="Go to Dogs"
        onPress={() => navigation.navigate('Dog Screen')}
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

export default YourCollectionScreen;