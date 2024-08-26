import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ResponseError } from "../error/response-error";

// Extend Request interface to include user property
interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}
export const authenticatedUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      throw new ResponseError(401, "Authentication failed");
    }

    jwt.verify(token, process.env.TOKEN_SECRET!, (err, decode) => {
      if (err) {
        throw new ResponseError(401, "Invalid Token");
      }
      req.user = decode;
      next();
    });
  } catch (error) {
    next(error);
  }
};
