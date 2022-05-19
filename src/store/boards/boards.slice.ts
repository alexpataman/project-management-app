import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';
import { boards } from '../../api/backend/boards';
import {
  ACTION_CREATE_BOARD,
  ACTION_DELETE_BOARD,
  ACTION_GET_BOARDS,
  BOARDS_SLICE_NAME,
} from '../../constants/store';
import { useAuthControl } from '../../hooks/useAuthControl';
import { BoardsCreateRequest } from '../../types/api';
import { BoardsState } from '../../types/store/boards';

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
      .addCase(deleteBoard.pending, loading)
      .addCase(getBoards.pending, loading)
      .addCase(getBoards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.boards = action.payload || [];
      });
  },
});

const loading = (state: BoardsState) => {
  state.isLoading = true;
};

export const getBoards = createAsyncThunk(ACTION_GET_BOARDS, async () => {
  const authControl = useAuthControl();
  return await authControl(boards.getBoards());
});

export const createBoard = createAsyncThunk(
  ACTION_CREATE_BOARD,
  async (data: BoardsCreateRequest, { dispatch }) => {
    const authControl = useAuthControl();
    await authControl(boards.createBoard(data));
    dispatch(getBoards());
  }
);

export const deleteBoard = createAsyncThunk(
  ACTION_DELETE_BOARD,
  async (id: string, { dispatch }) => {
    const authControl = useAuthControl();
    await authControl(boards.deleteBoard(id));
    dispatch(getBoards());
  }
);

export const {} = slice.actions;
export const getBoardsState = (state: RootState) => state[BOARDS_SLICE_NAME];
export const boardsReducer = slice.reducer;
