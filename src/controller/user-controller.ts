import { NextFunction, Request, Response } from "express";
import { LoginRequest, SignUpRequest } from "../model/user-model";
import UserService from "../service/user-service";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: SignUpRequest = req.body as SignUpRequest;
      const response = await UserService.signUp(request);
      res.status(201).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginRequest = req.body as LoginRequest;
      const response = await UserService.login(request);
      res.status(200).json({ token: response.token });
    } catch (error) {
      next(error);
    }
  }
}
