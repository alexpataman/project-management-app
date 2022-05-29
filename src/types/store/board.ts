import { ColumnResponse } from '../api';

export type BoardState = {
  title: string;
  isLoading: boolean;
  columnsLoading: boolean;
  background: string;
  columns: ColumnResponse[];
};
