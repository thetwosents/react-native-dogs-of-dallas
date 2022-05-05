import {View, Text, StyleSheet, Button, StatusBar} from 'react-native';
import React from 'react';

// Packs for huskies of dallas
const packNames = [
  'Dallas Huskies',
]

const PacksScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Packs Screen</Text>
      <StatusBar style="auto" />
      {packNames.map((name) => (
        <Button
          key={name}
          title={name}
          onPress={() => console.log(`I like ${name}`)}
        />
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

export default PacksScreen;