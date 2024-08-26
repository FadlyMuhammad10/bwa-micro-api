import { ResponseError } from "../error/response-error";
import prisma from "../lib/prisma";
import {
  LoginRequest,
  SignUpRequest,
  ToUserResponse,
  UserResponse,
} from "../model/user-model";
import { createJwt } from "../utils";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";

export default class UserService {
  static async signUp(request: SignUpRequest): Promise<UserResponse> {
    const SignUpRequest = Validation.validate(UserValidation.REGISTER, request);

    SignUpRequest.password = await bcrypt.hash(SignUpRequest.password, 10);

    const user = await prisma.user.create({
      data: SignUpRequest,
    });

    return ToUserResponse(user);
  }

  static async login(request: LoginRequest): Promise<UserResponse> {
    const LoginRequest = Validation.validate(UserValidation.LOGIN, request);

    const user = await prisma.user.findUnique({
      where: {
        email: LoginRequest.email,
      },
    });

    if (!user) {
      throw new ResponseError(401, "Email or Password is wrong");
    }

    const isMatch = await bcrypt.compare(LoginRequest.password, user.password);

    if (!isMatch) {
      throw new ResponseError(401, "Email or Password is wrong");
    }

    const payload = {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const token = createJwt(payload);

    return { token, ...ToUserResponse(user) };
  }
}
