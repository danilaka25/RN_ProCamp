import { StackActions, useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '../../components/Themed';
import Routes from '../../config/navigation/routes';
import { useAppDispatch } from '../../hooks/navigation';
import mockedUsers from '../../mock/users.json';
import { userActions } from '../profile/redux';

import {WINE_API_HOST} from '@env'


export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const defaultUser = mockedUsers.results[0];

  console.log("WINE_API_HOST", WINE_API_HOST)

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



    <View style={styles.loginFormWrapper}>

    <Text style={styles.title}>LOGIN</Text>

      <View style={styles.loginFormInputWrapper}>
        <TextInput
          style={styles.loginFormInput}
          //onChangeText={}
          // value={number}
          placeholder="Login"
         
        />



      </View>
      <View style={styles.loginFormInputWrapper}>
        <TextInput
            style={styles.loginFormInput}
            //onChangeText={}
            // value={number}
            placeholder="Password"   
        />
      </View>
      <Button
        onPress={openTabs}
        title="Go to application"
        color="#841584"
      />

    </View>

      
      
      
    
    </View>
  );
}

const styles = StyleSheet.create({


  loginFormWrapper: {
    width: '80%',
    minHeight: '50%',
    justifyContent: 'space-around',
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  loginFormInputWrapper: {

  },

  loginFormInput: {
    backgroundColor: "#ccc",
    borderWidth: 1,

  },

  loginFormInputIcon: {

  },

  loginFormBtn: {

  },






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
