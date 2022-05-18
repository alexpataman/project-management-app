import { BoardsResponse } from '../api';

export interface BoardsState {
  isLoading: boolean;
  boards: BoardsResponse[];
}
