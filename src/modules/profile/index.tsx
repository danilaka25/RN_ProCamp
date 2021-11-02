import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, SafeAreaView, Pressable, Button } from 'react-native';
import { View } from '../../components/Themed';
import { StackActions, useNavigation } from '@react-navigation/native';
import Routes from '../../config/navigation/routes';
import imgPlaceholder from '../../../assets/images/icon.png';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContactsField } from '../../components/core';
import { signOut } from '../../redux/auth'
import { useAppDispatch } from '../../hooks/navigation';

interface Props {
  image: String;
}

const ProfileScreen = (props: any) => {

  const dispatch = useAppDispatch();
  const [image, setImage] = useState<Props | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const navigation = useNavigation();

  const logOut = async () => {
    console.log("logOut")
    dispatch(signOut())
    await AsyncStorage.removeItem('fireBaseToken');
  }

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
        <Text style={styles.name}>Danylo Melnikov</Text>

        <View style={styles.likesWrapper}><Text style={styles.likes}>40 likes</Text></View>

        <ContactsField icon="call-outline" text="38 (063) 233-22-11" />
        <ContactsField icon="mail-outline" text="someemail@gmail.com" />
        <ContactsField icon="map-outline" text="Some address 22/1" />
        <ContactsField text="text without icon" />

        <Button
          title="EDIT PROFILE"
          onPress={() => navigation.dispatch(StackActions.replace(Routes.editProfile))}
        />

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
