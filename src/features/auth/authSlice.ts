import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models/user';

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: User;
  isLoggedInSuccess: boolean;
}
export interface LoginPayload {
  username: string;
  password: string;
}
const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
  isLoggedInSuccess: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
      state.isLoggedInSuccess = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.logging = false;
      state.isLoggedIn = true;

      state.currentUser = action.payload;
      state.isLoggedInSuccess = true;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
      state.isLoggedInSuccess = false;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
      state.isLoggedInSuccess = false;
    },
  },
});
export const authActions = authSlice.actions;
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.logging;
const authReducer = authSlice.reducer;
export default authReducer;
