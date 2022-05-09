import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';
import { authorization } from '../../api/Backend/Authorization';
import { ACTION_SIGN_IN, ACTION_SIGN_UP, USER_SLICE_NAME } from '../../constants/store';
import { storage } from '../../helpers/storage';
import { SignInPayload, SignUpPayload, UserState } from '../../types/store/user';

export const initialState: UserState = {
  isGuest: !storage.get('token'),
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

export const signIn = createAsyncThunk(ACTION_SIGN_IN, async (data: SignInPayload) => {
  const response = await authorization.signIn(data);
  if (response.token) {
    await storage.set('token', response.token);
  }
});

export const signUp = createAsyncThunk(ACTION_SIGN_UP, (data: SignUpPayload) => {
  authorization.signUp(data);
});

export const logOut = createAsyncThunk(ACTION_SIGN_UP, () => {
  storage.remove('token');
});

export const {} = slice.actions;
export const getUserState = (state: RootState) => state[USER_SLICE_NAME];
export const userReducer = slice.reducer;
