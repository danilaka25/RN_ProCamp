/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { ColorSchemeName, View, Text } from 'react-native';
import Routes from './routes';
import { RootStackParamList } from '../../../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import LoginScreen from '../../modules/login';
import CreateAccountScreen from '../../modules/createAccount';
import { useAppSelector } from '../../hooks/navigation';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { restoreToken } from '../../redux/auth'
import { useAppDispatch } from '../../hooks/navigation';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const MainStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {

  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth.fireBaseToken);
  const loading = useAppSelector(state => state.auth.isLoading);

  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    (async function () {
      try {
        let fireBaseToken = await AsyncStorage.getItem("fireBaseToken");
        await setToken(fireBaseToken)
      } catch (e) {
        console.error(e);
      }

      if (token) {
        dispatch(restoreToken(token))
      }

    })();
  }, [token]);


  if (loading) {
    return (
      <View style={{ backgroundColor: '#ccc', flex: 1 }}>
        <Text>loading ...</Text>
      </View>
    );

  }

  return (

    (auth !== null) ? (
      <MainStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={Routes.tabs}>
        <MainStack.Screen name={Routes.tabs} component={BottomTabNavigator} />
      </MainStack.Navigator>
    ) : (
      <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={Routes.login}>
        <AuthStack.Screen name={Routes.login} component={LoginScreen} />
        <AuthStack.Screen name={Routes.createAccount} component={CreateAccountScreen} />
      </AuthStack.Navigator>
    )
  );
}
