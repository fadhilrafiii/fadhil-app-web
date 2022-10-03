import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'Redux/store';

import { SnackbarPosition, SnackbarType } from './../../Shared/Types/Snackbar';

interface SnackbarState {
  show?: boolean;
  type: SnackbarType;
  text: string;
  timeout?: number;
  position: SnackbarPosition;
}

interface SnackbarPayloadAction {
  type?: SnackbarType;
  text: string;
  timeout?: number;
  position?: SnackbarPosition;
}

const initialState: SnackbarState = {
  show: false,
  type: SnackbarType.SUCCESS,
  text: '',
  timeout: 1500,
  position: SnackbarPosition.TOP_CENTER,
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state: SnackbarState, action: PayloadAction<SnackbarPayloadAction>) => {
      state.show = true;
      state.type = action.payload.type || initialState.type;
      state.text = action.payload.text;
      state.timeout = action.payload.timeout || initialState.timeout;
      state.position = action.payload.position || initialState.position;
    },
    hideSnackbar: (state: SnackbarState) => {
      state.show = false;
      state.type = initialState.type;
      state.text = '';
      state.timeout = initialState.timeout;
      state.position = initialState.position;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export const snackbarSelector = (state: RootState) => state.snackbar;

export default snackbarSlice.reducer;
