export type UserResponse = {
  name: string;
  username: string;
  token?: string;
  refreshToken?: string;
};

export type UserRequest = {
  name?: string;
  username: string;
  password: string;
};

export type RefreshRequest = {
  refreshToken: string;
};
