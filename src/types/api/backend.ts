export type Tokens = {
  token: string;
  refreshToken: string;
};

export type GetTokens = () => Tokens;
export type SetTokens = (tokens: Tokens) => void;

export type AuthorizationResponse = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
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

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  password?: string;
};
