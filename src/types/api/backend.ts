export type User = {
  id: string;
  name: string;
  login: string;
};

export type SignUpRequest = {
  name: string;
  login: string;
  password: string;
};

export type SignUpResponse = {
  id: string;
  name: string;
  login: string;
};

export type LoginRequest = {
  login: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type BoardRequest = {
  title: string;
  description: string;
  color: string;
};

export type BoardResponse = {
  id: string;
  title: string;
  description: string;
  color: string;
  columns?: ColumnResponse[];
};

export type ColumnRequest = {
  title: string;
  order: number;
};

export type ColumnResponse = {
  id: string;
  title: string;
  order: number;
  tasks?: TaskResponse[];
};

export type TaskRequest = {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId?: string;
  columnId?: string;
};

export type UpdateTaskRequest = {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
};

export type TaskResponse = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};
