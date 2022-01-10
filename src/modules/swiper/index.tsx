import React, { useEffect, useState, useRef } from 'react'
import { usePreviousState } from '../../hooks/usePreviousState';
import {
    ActivityIndicator, FlatList, SafeAreaView, Text,
    View, StyleSheet, Dimensions
} from "react-native";
import { useQuery } from '@apollo/client'
import { store } from '../../config/firebase';
import { useAppSelector } from '../../hooks/navigation';
import { GetAnimeList } from './graphql';
import AnimeCard from '../../components/core/AnimeCard';
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

type AnimeItem = {
     
        id: string
        title: {
            romaji: string
        }
  
}

type AnimeList = AnimeItem[]

// interface AnimeList {
//     'Object': AnimeItem;
//   }


const AnimeSwiperScreen = () => {

    const [anime, setAnime] = useState<AnimeList>();
    const [variables, setVariables] = useState({ page: 1, perPage: 10 });
    const { data, loading, error } = useQuery(GetAnimeList, { variables })
    const ref: React.RefObject<FlatList> = useRef(null)
    const userId = useAppSelector(state => state.auth.fireBaseToken);

    const prevPage = usePreviousState(variables.page)
    const prevAnime = usePreviousState(anime)

    const getLastSeenPage = () => {

        if (userId !== null) {

            store.collection("users").doc(userId).get().then((doc) => {
                let requestParams = { ...variables }

                if (doc.exists && doc?.data() !== undefined) {
                    requestParams.page = doc?.data()?.lastSeenPage
                    setVariables({ ...requestParams })

                } else {
                    requestParams.page = 1
                    setVariables({ ...requestParams })
                }

            })

        }


    }

    const fetch = () => {

        if (loading) {
            return (
                <View style={{ backgroundColor: 'red' }}>
                    <Text>loading</Text>
                </View>
            );
        }

        if (error) {

            return (
                <View>
                    <Text>error :(</Text>
                </View>
            );
        }

        if (data && userId) {

            //console.log("data page", variables.page, prevPage)
            console.log("data anime", anime)

            if (variables.page !== prevPage && typeof (prevPage) == 'number') { // need to refactor

                console.log("fetch 1")

                let newAnimeAdded = [...anime, ...data.Page.media]

                setAnime(newAnimeAdded)

                store.collection('users')
                    .doc(userId)
                    .update({
                        lastSeenPage: data.Page.pageInfo.currentPage
                    });

            } else {

                console.log("fetch 2")

                setAnime(data.Page.media);

            }

        }
    }

    // useEffect(() => {
    //     getLastSeenPage()
    //     fetch()
    // }, []);

    useEffect(() => {
        getLastSeenPage()
        fetch()
    }, [data, loading, error]);

    const loadMore = () => {
        let requestParams = { ...variables }
        requestParams.page = requestParams.page + 1
        setVariables({ ...requestParams })
    }

    if (!anime) return <ActivityIndicator />

    return (
        <SafeAreaView>
            <FlatList
                ref={ref}
                data={anime}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item) => (<AnimeCard props={item} />)}
                onEndReached={loadMore}
                onEndReachedThreshold={5}
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
        top: 0
    }
})