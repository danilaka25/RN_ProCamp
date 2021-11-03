import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, SafeAreaView, Pressable, Button, Linking, Alert, ActivityIndicator } from 'react-native';
import { View } from '../../components/Themed';
import imgPlaceholder from '../../../assets/images/icon.png';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContactsField } from '../../components/core';
import { signOut } from '../../redux/auth'
import { useAppDispatch, useAppSelector } from '../../hooks/navigation';
import { getAllLikes, getUserPersonalData, updateUserData } from '../../dbActions'
import * as Permissions from 'expo-permissions';
import { storage } from '../../config/firebase';

interface Props {
  image: String;
}

const ProfileScreen = (props: any) => {

  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.fireBaseToken);
  const [image, setImage] = useState<Props | null>(null);
  const [likes, setLikes] = useState([]);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Sorry',
          'Sorry, we need camera roll permissions to make this work!',
          [
            { text: 'Give permissions', onPress: () => Linking.openURL('app-settings:') },
            { text: 'No', onPress: () => console.log('No button clicked'), style: 'cancel' },
          ],
          {
            cancelable: true
          }
        );
      }
    })();

    countLikes(userId)
    getUserContacts(userId)

  }, []);


  const countLikes = (userId) => {
    getAllLikes(userId).then((likeIds) => {
      setLikes(Object.keys(likeIds).length)
    })
  }

  const getUserContacts = (userId) => {
    getUserPersonalData(userId).then((userData) => {
      setUserData(userData)

      if(typeof(userData.avatarUrl) !== "undefined") {
        setImage(userData.avatarUrl)
      }

      setIsLoading(false)
    })
  }


  const pickImage = async () => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0,
    });

    let storageUrl = await uploadImageAsync(result.uri)
    console.log("storageUrl", storageUrl)
    
    setImage(storageUrl);
   

    if (!result.cancelled) {

      setImage(result.uri);
      updateUserData(userId, 'avatarUrl', storageUrl)

    }

  };

 
  const logOut = async () => {
    console.log("logOut")
    dispatch(signOut())
    await AsyncStorage.removeItem('fireBaseToken');
  }

  async function uploadImageAsync(uri) {

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = storage.ref().child(new Date().toISOString());
    const snapshot = await ref.put(blob);
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }

  // if(isLoading) return <ActivityIndicator/>

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.profileHeader}>

        <Pressable style={styles.logOut} onPress={logOut}>
          <Ionicons name="log-out-outline" size={30} color="#fff" />
          <Text style={styles.logOutText}>Log out</Text>
        </Pressable>

        <Pressable style={styles.editPhoto} onPress={pickImage}>
          <Text style={styles.editPhotoText}>Edit photo</Text>
          <Ionicons name="create-outline" size={30} color="#fff" />
        </Pressable>

      </View>

      <View style={styles.profileContent}>
        <Image
          style={styles.avatar}
          source={image !== null ? { uri: image } : imgPlaceholder}
        />
        <Text style={styles.name}>{userData.fullName ? userData.fullName : 'Enter your full name'}</Text>
        <View style={styles.likesWrapper}><Text style={styles.likes}>{likes} likes</Text></View>
        <ContactsField icon="call-outline" text={userData.phone ? userData.phone : 'Enter your phone'} />
        <ContactsField icon="mail-outline" text={userData.email ? userData.email : 'Enter your email'} />
        <ContactsField icon="map-outline" text={userData.address ? userData.address : 'Enter your address'} />

      </View>
    </SafeAreaView>

  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  profileHeader: {
    backgroundColor: '#841584',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  logOut: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  logOutText: {
    color: '#fff',
    marginLeft: 5
  },
  editPhoto: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  editPhotoText: {
    color: '#fff',
    marginRight: 5
  },
  profileContent: {
    flex: 2,
    alignItems: 'center',
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 160,
    borderWidth: 6,
    borderColor: "#ccc",
    marginTop: -80,
    zIndex: 9,
    backgroundColor: '#fff',
    marginBottom: 20
  },
  name: {
    fontSize: 33,
    fontWeight: 'bold',
  },
  likesWrapper: {
    backgroundColor: '#841584',
    padding: 5,
    marginVertical: 15
  },
  likes: {
    color: '#fff',
    fontSize: 20
  },

});
