import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, TextInput, Pressable, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import Routes from '../../config/navigation/routes';
import { useAppDispatch } from '../../hooks/navigation';
import mockedUsers from '../../mock/users.json';
import { userActions } from '../profile/redux';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const defaultUser = mockedUsers.results[0];

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const openTabs = () => {

    let pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

    if (pattern.test(username) || username.length < 5) {
      setUsernameError(true)
      setTimeout(() => setUsernameError(false), 5000);
      Alert.alert("formHasErrors")
    } else {

      dispatch(userActions.setInitialUser({
        id: defaultUser.id,
        age: defaultUser.age,
        name: defaultUser.name.first,
        surname: defaultUser.name.last,
      }));

      navigation.dispatch(StackActions.replace(Routes.tabs));
    }

  };

  const togglePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword)
  }

  const loginWithGoogle = () => {

  }

  return (

    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={styles.loginFormWrapper}>
            <Text style={styles.title}>LOGIN PAGE</Text>
            <View style={styles.loginFormInputWrapper} >
              <Ionicons name="person" size={22} color="#841584" style={styles.loginFormInputIcon} />
              <TextInput
                style={[styles.loginFormInput, usernameError ? { borderColor: "red" } : { borderColor: "grey" }]}
                onChangeText={(username) => { setUsername(username) }}
                placeholder="Login"
             
              />
            </View>
            <View style={styles.loginFormInputWrapper}>
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.loginFormInputIcon}>
                <Ionicons name={visiblePassword ? 'eye-off' : 'eye'} size={22} color="#841584" />
              </TouchableOpacity>
              <TextInput
                style={styles.loginFormInput}
                //onChangeText={}
                placeholder="Password"
                secureTextEntry={!visiblePassword}
              />
            </View>
            <Pressable style={styles.loginFormBtn} onPress={openTabs}>
              <Text style={styles.loginFormBtnText}>Go to application</Text>
            </Pressable>
            <TouchableOpacity onPress={loginWithGoogle} style={styles.loginWithGoogle}>
              <Ionicons name="logo-google" size={50} color="#841584" />
            </TouchableOpacity>
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
  },
  loginFormInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#fff'
  },
  loginFormInput: {
    borderWidth: 1,
    paddingLeft: 40,
    height: 35,
    width: '100%',
    borderColor: 'grey'
  },
  loginFormInputIcon: {
    position: 'absolute',
    left: 9,
    zIndex: 9
  },
  loginFormBtn: {
    backgroundColor: '#841584',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 20
  },
  loginFormBtnText: {
    color: '#fff'
  },
  loginWithGoogle: {
    marginBottom: 30
  },

});
