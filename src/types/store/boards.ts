import { BoardResponse } from '../api';

export interface BoardsState {
  isLoading: boolean;
  boards: BoardResponse[];
}
