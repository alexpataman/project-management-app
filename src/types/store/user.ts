export interface UserState {
  isGuest: boolean;
}

export type SignInPayload = {
  login: string;
  password: string;
};

export type SignUpPayload = {
  name: string;
  login: string;
  password: string;
};
