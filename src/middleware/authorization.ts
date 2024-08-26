import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/response-error";

interface AuthorizationRequest extends Request {
  user?: {
    role: string;
  };
}

export const isAdmin = async (
  req: AuthorizationRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Periksa apakah req.user ada
    if (!req.user) {
      throw new ResponseError(401, "Unauthorized: No user data");
    }

    // Periksa apakah user adalah admin
    if (req.user.role === "admin") {
      return next();
    }

    // Jika user bukan admin, lemparkan error
    throw new ResponseError(401, "Unauthorized: Admin access required");
  } catch (error) {
    next(error);
  }
};
