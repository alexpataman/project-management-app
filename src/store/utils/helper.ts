import { SerializedError } from '@reduxjs/toolkit';

import { ThunkError } from '../../errors';
import { BoardsState } from '../../types/store/boards';

export const throwThunkError = (state: BoardsState, action: { error: SerializedError }) => {
  throw new ThunkError(action.error);
};
