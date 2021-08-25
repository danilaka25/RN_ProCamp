import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../../modules/chat';

export const ChatStackRoutes = {
  main: 'CHAT'
};

const ChatStack = createStackNavigator();

const ChatTab = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name={ChatStackRoutes.main}
        component={ChatScreen}
      />
    </ChatStack.Navigator>
  );
};

export default ChatTab;