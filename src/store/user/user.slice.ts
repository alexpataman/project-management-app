import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';
import { LOCAL_STORAGE_TOKEN_ID, LOCAL_STORAGE_USER_NAME_ID } from '../../constants';
import { ACTION_LOG_OUT, ACTION_SIGN_IN, USER_SLICE_NAME } from '../../constants/store';
import { storage } from '../../helpers/storage';
import { UserState } from '../../types/store/user';

export const initialState: UserState = {
  isGuest: !storage.get(LOCAL_STORAGE_TOKEN_ID),
  name: storage.get(LOCAL_STORAGE_USER_NAME_ID),
};

const slice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.isGuest = false;
        state.name = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isGuest = true;
        state.name = '';
      });
  },
});

export const signIn = createAsyncThunk(ACTION_SIGN_IN, (data: { token: string; name: string }) => {
  storage.set(LOCAL_STORAGE_TOKEN_ID, data.token);
  storage.set(LOCAL_STORAGE_USER_NAME_ID, data.name);
  return data.name;
});

export const logOut = createAsyncThunk(ACTION_LOG_OUT, () => {
  storage.clear();
});

export const {} = slice.actions;
export const getUserState = (state: RootState) => state[USER_SLICE_NAME];
export const userReducer = slice.reducer;
