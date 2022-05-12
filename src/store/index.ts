import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import { USER_SLICE_NAME } from '../constants/store';
import { userReducer } from './user/user.slice';

export const store = configureStore({
  reducer: {
    [USER_SLICE_NAME]: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
