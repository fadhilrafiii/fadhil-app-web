import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'Redux/store';

import { User } from 'Shared/Types/User';

export interface UserState {
  isAuthenticated: boolean;
  isLoading: boolean;
  errorMessage: string;
  profile?: User;
}

const initialState: UserState = {
  isAuthenticated: false,
  isLoading: false,
  errorMessage: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthLoading: (state: UserState) => {
      state.isLoading = true;
    },
    setUser: (state: UserState, action: PayloadAction<User>) => {
      state.profile = action.payload;
      state.isLoading = false;
      state.errorMessage = '';
      state.isAuthenticated = true;
    },
    setAuthError: (state: UserState, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      state.isLoading = false;
      state.profile = undefined;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthLoading, setUser, setAuthError } = userSlice.actions;
export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
