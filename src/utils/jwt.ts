import jwt from "jsonwebtoken";

interface JwtPayload {
  name: string;
  userId: number;
  email: string;
  role: string;
}

export const createJwt = (payload: JwtPayload) => {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET!);
  return token;
};
