import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';
import {
  LOCAL_STORAGE_TOKEN_ID,
  LOCAL_STORAGE_USER_ID,
  LOCAL_STORAGE_USER_NAME_ID,
} from '../../constants';
import { USER_ACTIONS, USER_SLICE_NAME } from '../../constants/store';
import { storage } from '../../helpers/storage';
import { LoginResponse } from '../../types/api';
import { UserState } from '../../types/store/user';

export const initialState: UserState = {
  isGuest: !storage.get(LOCAL_STORAGE_TOKEN_ID),
  name: storage.get(LOCAL_STORAGE_USER_NAME_ID),
  id: storage.get(LOCAL_STORAGE_USER_ID),
};

const slice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.isGuest = false;
        state.name = action.payload.name;
        state.id = action.payload.id;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isGuest = true;
        state.name = '';
        state.id = '';
      });
  },
});

export const signIn = createAsyncThunk(
  USER_ACTIONS.SIGN_IN,
  ({ token, name, id }: LoginResponse) => {
    storage.set({
      [LOCAL_STORAGE_TOKEN_ID]: token,
      [LOCAL_STORAGE_USER_NAME_ID]: name,
      [LOCAL_STORAGE_USER_ID]: id,
    });
    return { name, id };
  }
);

export const logOut = createAsyncThunk(USER_ACTIONS.LOG_OUT, () => {
  storage.clear();
});

export const {} = slice.actions;
export const getUserState = (state: RootState) => state[USER_SLICE_NAME];
export const userReducer = slice.reducer;
