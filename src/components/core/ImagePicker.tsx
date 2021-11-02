import React, { useEffect } from 'react';
import {Button, Image, View, Platform, Pressable} from 'react-native';
import styled from 'styled-components/native'
import * as ExpoImagePicker from 'expo-image-picker';

// @ts-ignore
//import noImage from '../../assets/images/noImage.png'

interface ImagePickerProps {
    setImage: Function
    image: string
}

const ImagePicker = ({
        setImage,
        image
    }: ImagePickerProps) => {
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result: any = await ExpoImagePicker.launchImageLibraryAsync({
            mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Pressable onPress={pickImage}>
                <ChosenImage source={ image ? { uri: image } : noImage} />
            </Pressable>
        </View>
    );
}

const ChosenImage = styled.Image({
    width: 350,
    height: 350,
    borderRadius: 50,
})

export default ImagePicker
