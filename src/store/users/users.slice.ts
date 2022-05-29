import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';
import { users } from '../../api/backend';
import { ACTION_GET_USERS, USERS_SLICE_NAME } from '../../constants/store';
import { UsersState } from '../../types/store/users';

export const initialState: UsersState = {
  users: [],
};

const slice = createSlice({
  name: USERS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload || [];
    });
  },
});

export const getUsers = createAsyncThunk(ACTION_GET_USERS, () => {
  return users.getUsers();
});

export const {} = slice.actions;
export const getUsersState = (state: RootState) => state[USERS_SLICE_NAME];
export const usersReducer = slice.reducer;
