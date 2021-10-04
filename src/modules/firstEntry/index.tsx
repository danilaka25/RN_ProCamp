import  React, {useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';

import useFetch from '../../hooks/useFetch';
import wineTypes from '../../mock/wineTypes';

export default function FirstEntry() {

  useEffect(() => {
   
    console.log("wineTypes", wineTypes)

    //useFetch(wineTypes);

  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FirstEntry</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
