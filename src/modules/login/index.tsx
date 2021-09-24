import { StackActions, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Button, StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import Routes from '../../config/navigation/routes';
import { useAppDispatch } from '../../hooks/navigation';
import mockedUsers from '../../mock/users.json';
import { userActions } from '../profile/redux';

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const defaultUser = mockedUsers.results[0];

  const openTabs = () => {
    dispatch(userActions.setInitialUser({
      id: defaultUser.id,
      age: defaultUser.age,
      name: defaultUser.name.first,
      surname: defaultUser.name.last,
    }));

    navigation.dispatch(StackActions.replace(Routes.tabs));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button
        onPress={openTabs}
        title="Go to application"
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
  button: {
    backgroundColor: 'red',
  }
});
