import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isLoading: boolean,
  isSignout: boolean,
  fireBaseToken: string | null,
}

const initialState = {
  isLoading: true,
  isSignout: false,
  fireBaseToken: null,
 } as AuthState

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    restoreToken(state, action: PayloadAction<string>) {
      state.isLoading = false,
      state.isSignout = false,
      state.fireBaseToken = action.payload
    },

    signIn(state, action: PayloadAction<string>){
      state.isLoading = false,
      state.isSignout = false,
      state.fireBaseToken = action.payload
    },

    signOut(state){
      state.isLoading = false,
      state.isSignout = true,
      state.fireBaseToken = null
    }
   
  },
})

export const { signIn, signOut, restoreToken } = authSlice.actions
export default authSlice.reducer