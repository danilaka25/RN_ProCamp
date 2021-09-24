import { combineReducers, configureStore } from '@reduxjs/toolkit';
import chatReducer from '../../modules/chat/redux';
import profileReducer from '../../modules/profile/redux';

const rootReducer = combineReducers({
  chat: chatReducer,
  user: profileReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;