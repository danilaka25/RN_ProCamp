import { StackActions, useNavigation } from '@react-navigation/native';
import  React, { useState } from "react";
 
import { Alert, StyleSheet, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { Text, View } from '../../components/Themed';
import Routes from '../../config/navigation/routes';
import { useAppDispatch } from '../../hooks/navigation';
import { auth } from '../../config/firebase';
import { signIn } from '../../redux/auth';
import { Button, Input } from '../../components/core';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Message } from '../likeList/types';

export default function LoginScreen() {

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emialError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [firebaseUserData, setFirebaseUserData] = useState('');


  interface IuserData {
    address: string | undefined,
    phone: string | undefined,
    displayName: string | undefined,
    email: string | undefined,
  }


  const Login = async () => {
    if (email !== '' && password !== '') {

      try {

        await auth.signInWithEmailAndPassword(email, password).then((userCredential) => {

          if (userCredential.user !== null) {
           // console.log('333', userCredential)
           // setUserData(userCredential.user.toJSON() as IuserData)
           return userCredential.user.email
          
          }

        })
        .then((email) => {

            AsyncStorage.setItem("fireBaseToken", email as string)
            dispatch(signIn(email as string))        

        })


      }

      catch (error) {
        if (error instanceof Error) {
          Alert.alert("Error", JSON.stringify(error.message))
        }
      }

    }

    email == '' ? setEmailError(true) : setEmailError(false)
    password == '' ? setPasswordError(true) : setPasswordError(false)

  };

  const createAccount = () => {
    navigation.dispatch(StackActions.replace(Routes.createAccount));
  }

  return (

    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={styles.loginFormWrapper}>

            <Text style={styles.title}>LOGIN PAGE</Text>
            <Input placeholder='Email' value={email} onChange={setEmail} icon={'mail-outline'} error={emialError ? true : false} />
            <Input placeholder='Password' value={password} onChange={setPassword} icon={'eye-off'} error={passwordError ? true : false} isPassword={true} />
            <Button label={'Login'} onPress={Login} />
            <Button label={'Create account'} onPress={createAccount} transparent />

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
