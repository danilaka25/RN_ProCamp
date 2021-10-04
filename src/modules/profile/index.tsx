import * as React from 'react';
import { Button, StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { StackActions, useNavigation } from '@react-navigation/native';
import Routes from '../../config/navigation/routes';

export default function ProfileScreen() {

  const navigation = useNavigation();

  const logOut = () => {
    navigation.dispatch(StackActions.replace(Routes.login));

  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button
        onPress={logOut}
        title="Log out"
        color="#841584"
      />
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
