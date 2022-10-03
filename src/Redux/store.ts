import { configureStore } from '@reduxjs/toolkit';

import appSlice from './Slices/appSlice';
import userReducer from './Slices/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    app: appSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
