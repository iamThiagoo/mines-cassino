import { ObjectId } from 'mongoose';

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

export interface UserDocument extends Document {
  _id: ObjectId;
  name: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
