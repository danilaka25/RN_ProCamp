import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SwiperScreen from '../../modules/swiper';

export const SwiperStackRoutes = {
  main: 'SWIPER'
};

const SwiperStack = createStackNavigator();

const SwiperTab = () => {
  return (
    <SwiperStack.Navigator>
      <SwiperStack.Screen
        name={SwiperStackRoutes.main}
        component={SwiperScreen}
      />
    </SwiperStack.Navigator>
  );
};

export default SwiperTab;