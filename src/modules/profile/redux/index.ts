import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number | string | null;
  name: string;
  surname: string;
  age: number | null;
}

const initialState: UserState = {
  id: null,
  name: '',
  surname: '',
  age: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInitialUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.age = action.payload.age;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    }
  },
});

export const userActions = slice.actions;

export default slice.reducer;