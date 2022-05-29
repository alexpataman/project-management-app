import { ColumnResponse } from '../api';

export type BoardState = {
  isLoading: boolean;
  background: string;
  columns: ColumnResponse[];
};
