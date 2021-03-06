import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '..';
import { boards as boardApi, columns as columnsApi, tasks as tasksApi } from '../../api/backend';
import {
  ACTION_ADD_COLUMN,
  ACTION_ADD_TASK,
  ACTION_DELETE_COLUMN,
  ACTION_DELETE_TASK,
  ACTION_GET_BOARD,
  ACTION_GET_COLUMN,
  ACTION_UPDATE_COLUMN,
  ACTION_UPDATE_TASK,
  BOARD_SLICE_NAME,
} from '../../constants/store';
import { ColumnRequest, TaskRequest, UpdateTaskRequest } from '../../types/api';
import { BoardState } from '../../types/store/board';
import { throwThunkError } from '../utils/helper';

export const initialState: BoardState = {
  title: '',
  isLoading: false,
  columnsLoading: false,
  background: '#fff',
  columns: [],
};

const slice = createSlice({
  name: BOARD_SLICE_NAME,
  initialState,
  reducers: {
    startColumnsLoading: (state) => {
      state.columnsLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoardById.pending, loading)
      .addCase(getBoardById.rejected, throwThunkError)
      .addCase(addColumn.rejected, throwThunkError)
      .addCase(getColumnById.rejected, throwThunkError)
      .addCase(deleteColumn.rejected, throwThunkError)
      .addCase(updateColumn.rejected, throwThunkError)
      .addCase(updateTask.rejected, throwThunkError)
      .addCase(addTask.rejected, throwThunkError)
      .addCase(deleteTask.rejected, throwThunkError)
      .addCase(getBoardById.fulfilled, (state, action) => {
        state.title = action.payload?.title || '';
        state.isLoading = false;
        state.columnsLoading = false;
        state.columns = action.payload?.columns?.sort((a, b) => a.order - b.order) || [];
        state.background = action.payload?.color || '#fff';
      })
      .addCase(addColumn.fulfilled, (state, action) => {
        state.columns = [...state.columns, action.payload];
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.columns = state.columns.filter((col) => col.id != action.payload);
      })
      .addCase(updateColumn.fulfilled, (state, action) => {
        state.columnsLoading = false;
        state.columns = state.columns
          .map((col) => {
            col.order = action.payload.find((e) => e.id === col.id)?.order || col.order;
            col.title = action.payload.find((e) => e.id === col.id)?.title || col.title;
            return col;
          })
          .sort((a, b) => a.order - b.order);
      })
      .addCase(getColumnById.fulfilled, (state, action) => {
        state.columnsLoading = false;
        const { id, title, order, tasks } = action.payload;
        state.columns.map((col) => {
          if (col.id === id) {
            col.title = title;
            col.order = order;
            col.tasks = tasks;
          }
          return col;
        });
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const { columnId } = action.payload;
        state.columns.map((col) => {
          if (col.id === columnId) {
            if (col.tasks) {
              col.tasks = [...col.tasks, action.payload];
            } else {
              col.tasks = [action.payload];
            }
          }
        });
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { columnId, taskId } = action.payload;
        state.columns.map((col) => {
          if (col.id === columnId) {
            col.tasks = col.tasks?.filter((t) => t.id !== taskId);
          }
        });
      });
  },
});

const loading = (state: BoardState) => {
  state.isLoading = true;
};

export const getBoardById = createAsyncThunk(ACTION_GET_BOARD, (boardId: string) => {
  return boardApi.getBoardById(boardId);
});

export const getColumnById = createAsyncThunk(
  ACTION_GET_COLUMN,
  ({ boardId, columnId }: { boardId: string; columnId: string }) => {
    return columnsApi.getColumnsById(boardId, columnId);
  }
);

export const addColumn = createAsyncThunk(
  ACTION_ADD_COLUMN,
  ({ boardId, title }: { boardId: string; title: string }) => {
    return columnsApi.createColumn(boardId, { title });
  }
);

export const deleteColumn = createAsyncThunk(
  ACTION_DELETE_COLUMN,
  ({ boardId, columnId }: { boardId: string; columnId: string }) => {
    columnsApi.deleteColumn(boardId, columnId);
    return columnId;
  }
);

export const updateColumn = createAsyncThunk(
  ACTION_UPDATE_COLUMN,
  async (
    {
      boardId,
      columnId,
      data,
    }: {
      boardId: string;
      columnId: string;
      data: ColumnRequest;
    },
    { dispatch }
  ) => {
    dispatch(BoardActions.startColumnsLoading());
    await columnsApi.updateColumn(boardId, columnId, data);
    return columnsApi.getColumns(boardId);
  }
);

export const addTask = createAsyncThunk(
  ACTION_ADD_TASK,
  ({ boardId, columnId, data }: { boardId: string; columnId: string; data: TaskRequest }) => {
    return tasksApi.createTask(boardId, columnId, data);
  }
);

export const updateTask = createAsyncThunk(
  ACTION_UPDATE_TASK,
  async (
    {
      boardId,
      columnId,
      taskId,
      data,
    }: {
      boardId: string;
      columnId: string;
      taskId: string;
      data: UpdateTaskRequest;
    },
    { dispatch }
  ) => {
    dispatch(BoardActions.startColumnsLoading());
    const resp = await tasksApi.updateTask(boardId, columnId, taskId, data);
    if (resp.columnId !== columnId) {
      dispatch(getColumnById({ boardId, columnId: resp.columnId }));
    }
    dispatch(getColumnById({ boardId, columnId }));
  }
);

export const deleteTask = createAsyncThunk(
  ACTION_DELETE_TASK,
  ({ boardId, columnId, taskId }: { boardId: string; columnId: string; taskId: string }) => {
    tasksApi.deleteTask(boardId, columnId, taskId);
    return { columnId, taskId };
  }
);

export const BoardActions = slice.actions;
export const getBoardState = (state: RootState) => state[BOARD_SLICE_NAME];
export const boardReducer = slice.reducer;
