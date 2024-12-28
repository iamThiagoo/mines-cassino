export type CreateUserResponse = {
  access_token: string;
  userId: string;
  username: string;
  balance: number;
};

export type UserResponse = {
  id: string;
  name: string;
  balance: number;
};

export type UserPayload = {
  userId: string;
  username: string;
  iat: number;
  exp: number;
};
