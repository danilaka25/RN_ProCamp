import React, { useEffect } from 'react';
import { Button, Image, View,  Pressable, Alert, Linking } from 'react-native';
import styled from 'styled-components/native'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { useAppSelector, useAppDispatch } from '../../hooks/navigation';
import { Ionicons } from '@expo/vector-icons';
import { updateUserData } from '../../dbActions'
import { storage } from '../../config/firebase';
import { setAvatarUrl } from '../../modules/profile/redux';

const ImagePickerBtn = () => {

    const userId = useAppSelector(state => state.auth.fireBaseToken);
    const dispatch = useAppDispatch();

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

    }, []);


    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 0,
        });

        let storageUrl = await uploadImageAsync(result.uri)

        if (!result.cancelled) {
            updateUserData(userId, 'avatarUrl', storageUrl)
            dispatch(setAvatarUrl(storageUrl))
        }

    };

    async function uploadImageAsync(uri: String) {

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
    
        const ref = storage.ref().child(new Date().toISOString()); //* *  */

        const snapshot = await ref.put(blob);
        blob.close();
    
        return await snapshot.ref.getDownloadURL();
    }

    return (
        <ChosenImageContainer>
            <ChosenImageText>Edit photo</ChosenImageText>
            <Pressable onPress={pickImage}><Ionicons name="create-outline" size={30} color="#fff" /></Pressable>
        </ChosenImageContainer>
    );
}

const ChosenImageContainer = styled.View({
    position: 'absolute',
    top: 7,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center'
})

const ChosenImageText = styled.Text({
    color: '#fff',
    marginRight: 5
})

const ChosenImage = styled.Image({
    width: 350,
    height: 350,
    borderRadius: 50,
})

export default ImagePickerBtn
