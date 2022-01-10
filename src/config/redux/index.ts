import { combineReducers, configureStore } from '@reduxjs/toolkit';
import chatReducer from '../../modules/likeList/redux';
import profileReducer from '../../modules/profile/redux';
import authReducer from '../../redux/auth'

const rootReducer = combineReducers({
  //chat: chatReducer,
  user: profileReducer,
  auth: authReducer
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;