import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, StatusBar, TextInput,Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddDogScreen = ({navigation}) => {
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const [dogImage, setDogImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('AddDogScreen: useEffect');
  }, [dogName]);

  useEffect(async() => {

  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setDogImage(result.uri);
      }
    } catch (E) {
      console.log(E);
    }
  }

  const handlePickedImage = async (pickerResult) => {
    try {
      setUploading(true);

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult);
        setDogImage(uploadUrl);
      }
    } catch (e) {
      console.log(e);
      alert("Upload failed, sorry :(");
    } finally {
      setUploading(false);
    }
  }

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        reject(new TypeError("Network request failed"));
      }
      xhr.responseType = "blob";
      xhr.open("GET", uri);
      xhr.send(null);
    })
    const fileRef = ref(getStorage(), Math.random().toString(36).substring(2) + ".jpg");
    const metadata = {
      contentType: 'image/jpg',
      metadata: {
  
       firebaseStorageDownloadTokens: Math.random().toString(36).substring(2)
      }
    };
    const result = await uploadBytes(fileRef, blob,metadata);
    const downloadUrl = await getDownloadURL(fileRef);
  
    dispatch({type: 'ADD_DOG', dog: {name: dogName, breed: breed, image: downloadUrl}});
  
    return downloadUrl;
  }

  return (
    <View style={styles.container}>
      <Text>Add Dog Screen</Text>
      <StatusBar style="auto" />
      <Text>Enter a dog name:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setDogName(text)}
        value={dogName}
      />
      {/* Breed text field */}
      <Text>Enter a breed:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setBreed(text)}
        value={breed}
      />
      {
        dogImage ?
          <Image style={styles.image} source={{ uri: dogImage }} /> :
          <Button title="Pick an image" onPress={pickImage} />
      }

      <Button
        title="Add Dog"
        onPress={() => handlePickedImage(dogImage)}
      />
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
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    width: 200,
    height: 40,
    margin: 10,
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
  } 
});



export default AddDogScreen;