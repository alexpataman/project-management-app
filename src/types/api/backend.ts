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

export type BoardsResponse = {
  id: string;
  title: string;
  description: string;
  color: string;
};

export type BoardsCreateRequest = {
  title: string;
  description: string;
  color: string;
};
