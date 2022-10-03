import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './../store';

interface GlobalState {
  isAppLoading: boolean;
}

const initialState: GlobalState = {
  isAppLoading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppLoading: (state: GlobalState, action: PayloadAction<boolean>) => {
      state.isAppLoading = action.payload;
    },
  },
});

export const { setAppLoading } = appSlice.actions;
export const appSelector = (state: RootState) => state.app;

export default appSlice.reducer;
