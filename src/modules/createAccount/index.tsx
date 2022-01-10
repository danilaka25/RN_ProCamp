import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Alert, StyleSheet, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { Text, View } from '../../components/Themed';
import Routes from '../../config/navigation/routes';
import { useAppDispatch } from '../../hooks/navigation';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, store } from '../../config/firebase';
import { signIn } from '../../redux/auth';
import { Button, Input } from '../../components/core';

export default function CreateAccountScreen() {

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emialError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  //const [visiblePassword, setVisiblePassword] = useState(false);

  const onHandleSignup = async () => {

    if (email !== '' && password !== '') {

      try {

        let userData: object;

        await auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {

          userData = userCredential.user.toJSON();

          store.collection('users')
            .doc(userData.email)
            .set({
              email: userData.email,
              token: userData.stsTokenManager.accessToken,
              lastSeenPage: 1,
              avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/rnbasecamp.appspot.com/o/ava.png?alt=media&token=1d50a462-9615-4e72-a362-bdc184cd6ea1',
            });

        })

        await AsyncStorage.setItem("fireBaseToken", userData.email)

        dispatch(signIn(userData.email))

        Alert.alert("Your account created successful")

      } catch (error) {
        console.log("error", error)
        if (error.toString().includes('The email address is already in use by another account')) {
          Alert.alert("The email address is already in use by another account")
        } else {
          Alert.alert("Some another error")
        }

      }
    }

    email == '' ? setEmailError(true) : setEmailError(false)
    password == '' ? setPasswordError(true) : setPasswordError(false)

  };

  const backToLogin = () => {
    navigation.dispatch(StackActions.replace(Routes.login))
  }

  return (

    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={styles.loginFormWrapper}>

            <Text style={styles.title}>CREATE ACCOUNT</Text>
            <Input name='Email' value={email} onChange={setEmail} icon={'mail-outline'} error={emialError ? true : false} />
            <Input name='Password' value={password} onChange={setPassword} icon={'eye-off'} error={passwordError ? true : false} isPassword={true} />
            <Button label={'Create account'} onPress={onHandleSignup} />
            <Button label={'Back to login'} onPress={backToLogin} transparent />

          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#ccc'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
  },
  loginFormWrapper: {
    width: '80%',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
