import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import { BOARDS_SLICE_NAME, BOARD_SLICE_NAME, USER_SLICE_NAME } from '../constants/store';
import { boardReducer } from './board/board.slice';
import { boardsReducer } from './boards/boards.slice';
import { userReducer } from './user/user.slice';

export const store = configureStore({
  reducer: {
    [USER_SLICE_NAME]: userReducer,
    [BOARDS_SLICE_NAME]: boardsReducer,
    [BOARD_SLICE_NAME]: boardReducer,
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
