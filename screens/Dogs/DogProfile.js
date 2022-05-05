import React, { useState, useEffect } from 'react';
import { Button, StatusBar, Text, Modal, TextInput, Image, View} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const DogProfileScreen = ({route, navigation}) => {
  const dog = route.params.dog;
  const {name, breed, image,id} = dog;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <View>
      <Text>{id}</Text>
      <Text>{name}</Text>
      <Text>{breed}</Text>
      <Image source={image || 'https://via.placeholder.com/150'} />
      
      {
        modalOpen &&
        <EditModal
          dog={dog}
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
        title="Share"
        onPress={() => {
          navigation.navigate('Share Dog', {dog: dog});
        }}
      />
      <Button
        title="Invites"
        onPress={() => {
          navigation.navigate('Invite List', {dog: dog});
        }}
      />
      <Button
        title="Accept Invite"
        onPress={() => {
          navigation.navigate('Accept Invite', {dog: dog});
        }}
      />
      <Button
        title="Decline Invite"
        onPress={() => {
          navigation.navigate('Decline Invite', {dog: dog});
        }}
      />
      <Button
        title="Check In"
        onPress={() => {
          navigation.navigate('Check In', {dog: dog});
        }}
      />
      <Button
        title="Connect"
        onPress={() => {
          navigation.navigate('Connect Dog', {dog: dog});
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