import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';
import { boards as boardApi } from '../../api/backend';
import { ACTION_GET_BOARD, BOARD_SLICE_NAME } from '../../constants/store/board.constants';
import { BoardResponse, ColumnResponse } from '../../types/api';

type BoardState = {
  isLoading: boolean;
  board: BoardResponse | null;
};

export const initialState: BoardState = {
  isLoading: false,
  board: null,
};

const slice = createSlice({
  name: BOARD_SLICE_NAME,
  initialState,
  reducers: {
    addColumn: (state: BoardState, action: PayloadAction<{ column: ColumnResponse }>) => {
      if (state.board) {
        if (!state.board?.columns) {
          state.board.columns = [action.payload.column];
        } else {
          state.board.columns = [...state.board.columns, action.payload.column];
        }
      }
    },
    editColumn: (
      state: BoardState,
      action: PayloadAction<{ columnId: string; column: ColumnResponse }>
    ) => {
      const { columnId, column } = action.payload;
      if (state.board) {
        if (!state.board?.columns) {
          state.board.columns = [action.payload.column];
        } else {
          const updated = state.board.columns.map((c) => {
            if (c.id !== columnId) return c;
            const { title, order, tasks } = column;
            if (tasks) {
              return { ...c, title, order, tasks };
            }
            return { ...c, title, order };
          });
          state.board.columns = updated;
        }
      }
    },
    deleteColumn: (state: BoardState, action: PayloadAction<{ columnId: string }>) => {
      if (state.board && state.board.columns) {
        state.board.columns = state.board.columns.filter(
          (col) => col.id !== action.payload.columnId
        );
      }
    },
    reorderColumns: (state: BoardState, action: PayloadAction<{ columns: ColumnResponse[] }>) => {
      if (state.board) {
        state.board.columns = action.payload.columns.sort((a, b) => a.order - b.order);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoardById.pending, loading)
      .addCase(getBoardById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.board = action.payload;
      });
  },
});

const loading = (state: BoardState) => {
  state.isLoading = true;
};

export const getBoardById = createAsyncThunk(ACTION_GET_BOARD, async (id: string) => {
  return await boardApi.getBoardById(id);
});

export const BoardActions = slice.actions;
export const getBoardState = (state: RootState) => state[BOARD_SLICE_NAME];
export const getColumnsState = (state: RootState) => state[BOARD_SLICE_NAME].board?.columns;
export const boardReducer = slice.reducer;
