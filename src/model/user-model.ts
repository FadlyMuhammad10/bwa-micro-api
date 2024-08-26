import { User } from "@prisma/client";

export type UserResponse = {
  name: string;
  email: string;
  occupation: string;
  token?: string;
};
export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
  occupation: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export function ToUserResponse(user: User): UserResponse {
  return {
    name: user.name,
    email: user.email,
    occupation: user.occupation,
  };
}
