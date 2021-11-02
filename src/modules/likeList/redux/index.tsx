import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../types';

interface ChatState {
  offset: number;
  limit: number;
  messages: Message[]
}

const initialState: ChatState = {
  offset: 0,
  limit: 10,
  messages: [],
};

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    }
  },
});

export const chatActions = slice.actions;

export default slice.reducer;