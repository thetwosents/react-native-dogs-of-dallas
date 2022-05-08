import React, { useState, useEffect } from 'react';
import { Button, StatusBar, StyleSheet, Text, Modal, TextInput, Image, View,ScrollView} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import QRCode from "react-qr-code";

const DogProfileScreen = ({route, navigation}) => {
  const dog = route.params.dog;
  const {name, breed, image,id} = dog;
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDog, setCurrentDog] = useState(null);

  const dogCollection = useSelector(state=>state.dogCollection.dogCollection || []);

  useEffect(() => {
    console.log('DogProfileScreen: useEffect');

    setCurrentDog(dog);
  }, [dog]);
  
  if (!currentDog) {
    return null;
  }
  return (
    <View>
      <StatusBar style="auto" />      
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: currentDog.image || currentDog.featured_image }} style={styles.image} />
        </View>
        
        <View style={styles.infoContainer}>          
          <View style={{width: '50%'}}>
          <Text style={styles.infoTitle}>{dog.breed}</Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 4, marginBottom: 12, paddingLeft: 0 }}>{currentDog.name}</Text>
          </View>
          <View style={{width: '50%', alignItems: 'flex-end'}}>
            <QRCode value={currentDog.id} size={64} />
          </View>
          
        </View>
      </ScrollView>
      {
        modalOpen &&
        <EditModal
          dog={currentDog}
          setModalOpen={setModalOpen}
        />
      }

      {/* Actions dog profiles can do */}
      <Button
        title="Edit"
        onPress={() => {
          // Open the modal
          setModalOpen(true);
        }}
      />
      <Button
        title="Invites"
        onPress={() => {
          navigation.navigate('Invite List', {dog: currentDog});
        }}
      />
      <Button
        title="Accept Invite"
        onPress={() => {
          navigation.navigate('Accept Invite', {dog: currentDog});
        }}
      />
      <Button
        title="Decline Invite"
        onPress={() => {
          navigation.navigate('Decline Invite', {dog: currentDog});
        }}
      />
      <Button
        title="Check In"
        onPress={() => {
          navigation.navigate('Check In', {dog: currentDog});
        }}
      />
      <Button
        title="Connect"
        onPress={() => {
          navigation.navigate('Connect Dog', {dog: currentDog});
        }}
      />
    </View>
  )
}

export default DogProfileScreen;

const EditModal = ({dog, setModalOpen}) => {
  const [name, setName] = useState(dog.name || '');
  const [breed, setBreed] = useState(dog.breed || '');
  const [image, setImage] = useState(dog.image || '');

  const dispatch = useDispatch();

  const updateDog = () => {
    dispatch({
      type: 'UPDATE_DOG',
      dog: {
        id: dog.id,
        name: name,
        breed: breed,
        image: image,
      }
    });
    setModalOpen(false);
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={true}
      onRequestClose={() => {
        setModalOpen(false);
      }}
    >
      <div>
        <h1>Edit Dog</h1>
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <TextInput
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          placeholder="Breed"
        />
        <TextInput
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
        />
        <Button
          title="Update"
          onPress={updateDog}
        />
        <Button
          title="Cancel"
          onPress={() => {
            setModalOpen(false);
          }}
        />
      </div>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: 240,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    marginBottom:0,
    marginTop: 0
  },
  infoContainer: {
    padding: 20,
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});