import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';
import { LOCAL_STORAGE_TOKEN_ID } from '../../constants';
import { ACTION_LOG_OUT, ACTION_SIGN_IN, USER_SLICE_NAME } from '../../constants/store';
import { storage } from '../../helpers/storage';
import { UserState } from '../../types/store/user';

export const initialState: UserState = {
  isGuest: !storage.get(LOCAL_STORAGE_TOKEN_ID),
};

const slice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state) => {
        state.isGuest = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isGuest = true;
      });
  },
});

export const signIn = createAsyncThunk(ACTION_SIGN_IN, (token: string) => {
  storage.set(LOCAL_STORAGE_TOKEN_ID, token);
});

export const logOut = createAsyncThunk(ACTION_LOG_OUT, () => {
  storage.remove(LOCAL_STORAGE_TOKEN_ID);
});

export const {} = slice.actions;
export const getUserState = (state: RootState) => state[USER_SLICE_NAME];
export const userReducer = slice.reducer;
