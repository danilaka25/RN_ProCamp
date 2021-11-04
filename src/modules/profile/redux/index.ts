import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number | string | null;
  fullName: string;
  likes: number | null;
  avatarUrl: string | null;
}

const initialState: UserState = {
  id: null,
  fullName: '',
  likes: 0,
  avatarUrl: null
};

const profileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInitialUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.likes = action.payload.likes;
      state.avatarUrl = action.payload.avatarUrl;  
    },
    setUserFullName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload;
    },
    setAvatarUrl: (state, action: PayloadAction<string>) => {
      state.avatarUrl = action.payload;
    }
  },
});

export const {setAvatarUrl} = profileSlice.actions;

export default profileSlice.reducer;