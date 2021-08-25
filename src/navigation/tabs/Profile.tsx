import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../../modules/profile';

export const ProfileStackRoutes = {
  main: 'PROFILE'
};
  
const ProfileStack = createStackNavigator();

const ProfileTab = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={ProfileStackRoutes.main}
        component={ProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileTab;