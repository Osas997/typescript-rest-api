export type UserResponse = {
  name: string;
  username: string;
  token?: string;
};

export type UserRequest = {
  name?: string;
  username: string;
  password: string;
};
