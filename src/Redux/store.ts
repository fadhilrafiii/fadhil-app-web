import { configureStore } from '@reduxjs/toolkit';

import appSlice from './Slices/appSlice';
import snackbarReducer from './Slices/snackbarSlice';
import taskReducer from './Slices/taskSlice';
import userReducer from './Slices/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    app: appSlice,
    snackbar: snackbarReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
