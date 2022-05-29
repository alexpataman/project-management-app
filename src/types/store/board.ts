import { ColumnResponse } from '../api';

export type BoardState = {
  isLoading: boolean;
  columnsLoading: boolean;
  background: string;
  columns: ColumnResponse[];
};
