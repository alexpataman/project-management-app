import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';
import { boards } from '../../api/backend';
import { BOARDS_ACTIONS, BOARDS_SLICE_NAME } from '../../constants/store';
import { BoardRequest } from '../../types/api';
import { BoardsState } from '../../types/store/boards';
import { throwThunkError } from '../utils/helper';

export const initialState: BoardsState = {
  isLoading: false,
  boards: [],
};

const slice = createSlice({
  name: BOARDS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBoard.pending, loading)
      .addCase(createBoard.rejected, throwThunkError)
      .addCase(deleteBoard.pending, loading)
      .addCase(deleteBoard.rejected, throwThunkError)
      .addCase(getBoards.pending, loading)
      .addCase(getBoards.rejected, throwThunkError)
      .addCase(getBoards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boards = action.payload || [];
      });
  },
});

const loading = (state: BoardsState) => {
  state.isLoading = true;
};

export const getBoards = createAsyncThunk(BOARDS_ACTIONS.GET_BOARDS, () => {
  return boards.getBoards();
});

export const createBoard = createAsyncThunk(
  BOARDS_ACTIONS.CREATE_BOARD,
  async (data: BoardRequest, { dispatch }) => {
    await boards.createBoard(data);
    dispatch(getBoards());
  }
);

export const deleteBoard = createAsyncThunk(
  BOARDS_ACTIONS.DELETE_BOARD,
  async (id: string, { dispatch }) => {
    await boards.deleteBoard(id);
    dispatch(getBoards());
  }
);

export const {} = slice.actions;
export const getBoardsState = (state: RootState) => state[BOARDS_SLICE_NAME];
export const boardsReducer = slice.reducer;
