/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import Routes from './routes';
import SwiperScreen from '../../modules/swiper';
import ChatScreen from '../../modules/chat';
import ProfileScreen from '../../modules/profile';

const BottomTab = createBottomTabNavigator();

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  const getIconColor = (focused: boolean) => focused ? Colors[colorScheme].tabIconSelected : Colors[colorScheme].tabIconDefault;

  return (
    <BottomTab.Navigator
      initialRouteName={Routes.tabs}
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name={Routes.swiper}
        component={SwiperScreen}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => <Ionicons color={getIconColor(focused)} size={30} name="copy-outline" />,
        }}
      />
      <BottomTab.Screen
        name={Routes.chat}
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => <Ionicons color={getIconColor(focused)} size={30} name="chatbubbles-outline" />,
        }}
      />
      <BottomTab.Screen
        name={Routes.profile}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => <Ionicons color={getIconColor(focused)} size={30} name="person-outline" />,
        }}
      />
    </BottomTab.Navigator>
  );
}
