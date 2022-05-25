import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';
import {
  LOCAL_STORAGE_TOKEN_ID,
  LOCAL_STORAGE_USER_ID,
  LOCAL_STORAGE_USER_NAME_ID,
} from '../../constants';
import { USER_ACTIONS, USER_SLICE_NAME } from '../../constants/store';
import { storage } from '../../helpers/storage';
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
  (data: { token: string; name: string; id: string }) => {
    storage.set(LOCAL_STORAGE_TOKEN_ID, data.token);
    storage.set(LOCAL_STORAGE_USER_NAME_ID, data.name);
    storage.set(LOCAL_STORAGE_USER_ID, data.id);
    return { name: data.name, id: data.id };
  }
);

export const logOut = createAsyncThunk(USER_ACTIONS.LOG_OUT, () => {
  storage.clear();
});

export const {} = slice.actions;
export const getUserState = (state: RootState) => state[USER_SLICE_NAME];
export const userReducer = slice.reducer;
