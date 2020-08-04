import React, { useState } from 'react';
import { View, StyleSheet, Image, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

async function askForPermissions() {
  const permissions = await Promise.all([
    ImagePicker.requestCameraPermissionsAsync(),
    ImagePicker.requestCameraRollPermissionsAsync()
  ])
  
  if (permissions.some(a => a.status !== 'granted')) {
    Alert.alert('Ошибка', 'Вы не дали прав на создание фото');
    return false;
  }
  return true;
}

const PhotoPicker = ({ onPick }) => {
  const [image, setImage] = useState(null);

  const takePhoto = async () => {
    const hasPermissions = await askForPermissions();

    if(!hasPermissions) return;

    const img = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
      aspect: [16, 9]
    })

    setImage(img.uri);
    onPick(img.uri);
  };

  return (
    <View style={styles.wrapper}>
      <Button title='Сделать фото' onPress={takePhoto} />
      {image && (
        <Image style={styles.image} source={{ uri: image }} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    marginTop: 10,
    height: 200,
  }
})

export default PhotoPicker;