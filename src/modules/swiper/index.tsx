import React, { useEffect, useState, useRef } from 'react'
import {
    ActivityIndicator, Image, ScrollView, FlatList, Button, SafeAreaView, Text,
    View, StyleSheet, Dimensions
} from "react-native";
import { useQuery, useLazyQuery } from '@apollo/client'
import styled from 'styled-components/native'

import { GetAnimeList } from './graphql'


const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const renderAnimeItem = ({ item }) => {
    return (
        <View key={item.id} style={styles.itemAnime}>
            <Image source={{uri: item.coverImage.large}}  resizeMode="cover" style={styles.itemAnimeImage}/>
            <Text style={styles.itemAnimeTitle}>{item.title.romaji}</Text>
        </View>
    )
}

const AnimeSwiperScreen = () => {

    const [anime, setAnime] = useState();
    const [variables, setVariables] = useState({ page: 1, perPage: 20 });
    const { data, loading, error } = useQuery(GetAnimeList, { variables }) 
    //const ref: RefObject<Flatlist> = useRef(null)

    const fetch = () => {

        if (data) {
            if (variables.page > 1) {
                let newAnimeAdded = [...anime, ...data.Page.media]
                setAnime(newAnimeAdded)
            } else {
                setAnime(data.Page.media);
            }

        } else {

            if (loading) {
                return (
                    <View>
                        <Text>loading</Text>
                    </View>
                );
            }

            if (error) {
                console.log("error", error)
                return (
                    <View>
                        <Text>error :(</Text>
                    </View>
                );
            }
        }

    }

    useEffect(() => {
        fetch()
    }, [data, variables, error]);

    const loadMore = () => {
        let requestParams = { ...variables }
        requestParams.page = requestParams.page + 1
        setVariables({ ...requestParams })
    }

    if (!anime) return <ActivityIndicator />

    return (
        <SafeAreaView>
            <FlatList
                // ref={ref}
                data={anime}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderAnimeItem}
                onEndReached={loadMore}
                onEndReachedThreshold={1}
                style={styles.listAnime}
            />
        </SafeAreaView>
    );
}

export default AnimeSwiperScreen

const styles = StyleSheet.create({
    listAnime: {
        backgroundColor: '#ccc'
    },
    itemAnime: {
        position: 'relative',
        height: SCREEN_HEIGHT/2,
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
    }
})