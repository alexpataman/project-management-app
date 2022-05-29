import { SerializedError } from '@reduxjs/toolkit';

import { ThunkError } from '../../errors';
import { BoardState } from '../../types/store/board';
import { BoardsState } from '../../types/store/boards';

export const throwThunkError = (
  state: BoardsState | BoardState,
  action: { error: SerializedError }
) => {
  throw new ThunkError(action.error);
};
