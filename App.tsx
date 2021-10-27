import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/config/navigation';
import { Provider } from 'react-redux';
import { store } from './src/config/redux';
import {ApolloClient, ApolloProvider, InMemoryCache, gql} from "@apollo/client";

const typeDefs = gql`
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page (page: 1, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search) {
      id
      coverImage {
        extraLarge
        large
        medium
        color
      }
      title {
        romaji
      }
    }
  }
}

`

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const client = new ApolloClient({
    uri: "https://graphql.anilist.co",
    cache: new InMemoryCache(),
    typeDefs,
  })

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </Provider>
      </ApolloProvider>
    );
  }
}
