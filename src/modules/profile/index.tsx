import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, SafeAreaView, Pressable, Button, Linking, Alert, ActivityIndicator } from 'react-native';
import { View } from '../../components/Themed';
import imgPlaceholder from '../../../assets/images/icon.png';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContactsField, ImagePickerBtn } from '../../components/core';
import { signOut } from '../../redux/auth'
import { useAppDispatch, useAppSelector } from '../../hooks/navigation';
import { getAllLikes, getUserPersonalData } from '../../dbActions'

interface Props {
  image: String;
}

const ProfileScreen = (props: Object) => {

  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.fireBaseToken);
  const [image, setImage] = useState<Props | null>(null);
  const [likes, setLikes] = useState([]);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    countLikes(userId)
    getUserContacts(userId)

  }, []);


  const countLikes = (userId: String) => {
    getAllLikes(userId).then((likeIds) => {
      setLikes(Object.keys(likeIds).length)
    })
  }

  const getUserContacts = (userId : String) => {
    getUserPersonalData(userId).then((userData) => {
      setUserData(userData)

      if(typeof(userData.avatarUrl) !== "undefined") {
        setImage(userData.avatarUrl)
      }

      setIsLoading(false)
    })
  }

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

        <ImagePickerBtn />

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
