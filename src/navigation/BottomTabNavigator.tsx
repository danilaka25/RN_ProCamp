/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import SwiperTab from './tabs/Swiper';
import Routes from './routes';
import ChatTab from './tabs/Chat';
import ProfileTab from './tabs/Profile';

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
      initialRouteName={Routes.swiper.main}
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name={Routes.swiper.main}
        component={SwiperTab}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => <Ionicons color={getIconColor(focused)} size={30} name="copy-outline" />,
        }}
      />
      <BottomTab.Screen
        name={Routes.chat.main}
        component={ChatTab}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => <Ionicons color={getIconColor(focused)} size={30} name="chatbubbles-outline" />,
        }}
      />
      <BottomTab.Screen
        name={Routes.profile.main}
        component={ProfileTab}
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => <Ionicons color={getIconColor(focused)} size={30} name="person-outline" />,
        }}
      />
    </BottomTab.Navigator>
  );
}
