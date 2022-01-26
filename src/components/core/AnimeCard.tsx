import React, { useState } from 'react'
import {
    Image, Text, View, StyleSheet, Dimensions, Pressable
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../hooks/navigation';
import {saveLikesToDB} from '../../dbActions'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

type AnimeItem = {

    props: {
        item: {
            id: string
            title: {
                romaji: string
            }
            coverImage: {
                large: string
            }
        } 
    }
     
}

 

const AnimeCard = ({ props }: AnimeItem) => {

    //console.log(props)

    const userId = useAppSelector(state => state.auth.fireBaseToken);
    const [like, setLike] = useState(false);

    const handleLike = () => {

        if(userId){

            if (!like) {
                saveLikesToDB('save', props, userId )
            } else {
                saveLikesToDB('remove', props, userId )
            }

        }

        setLike(!like)
    }

    return (
        <View key={props.item.id} style={styles.itemAnime}>
            <Image source={{ uri: props.item.coverImage.large }} resizeMode="cover" style={styles.itemAnimeImage} />
            <Text style={styles.itemAnimeTitle}>{props.item.title.romaji} {props.item.id}</Text>
            <Pressable style={styles.heart} onPress={handleLike}>
                <Ionicons name={like ? 'heart-sharp' : 'heart-outline'} size={40} color={like ? 'red' : '#fff'}/>
            </Pressable>
        </View>
    )
}

export default AnimeCard

const styles = StyleSheet.create({

    itemAnime: {
        position: 'relative',
        height: SCREEN_HEIGHT / 2,
        width: SCREEN_WIDTH - 20,
        marginBottom: 20,
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center'
    },
    itemAnimeImage: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    itemAnimeTitle: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5
    },
    heart: {
        position: 'absolute',
        right: 0,
        top: 0,
    }
})