import { prisma } from "../app/database";
import { ResponseError } from "../error/response-error";
import type { UserRequest, UserResponse } from "../model/user-model";
import { JwtToken } from "../utils/jwt";
import { UserValidation } from "../validation/user-validation";
import { validate } from "../validation/validation";
import bcrypt from "bcrypt";

export class UserService {
  static async register(req: UserRequest): Promise<UserResponse> {
    const registerRequest = validate(UserValidation.REGISTER, req);

    const username = await prisma.user.findUnique({
      where: {
        username: registerRequest.username,
      },
    });

    if (username) {
      throw new ResponseError("Username already exists", 400);
    }

    const user = await prisma.user.create({
      data: {
        name: registerRequest.name,
        username: registerRequest.username,
        password: await bcrypt.hash(registerRequest.password, 10),
      },
    });

    return user;
  }

  static async login(req: UserRequest): Promise<UserResponse> {
    const loginRequest = validate(UserValidation.LOGIN, req);

    const user = await prisma.user.findUnique({
      where: {
        username: loginRequest.username,
      },
    });

    if (!user) {
      throw new ResponseError("Invalid username or password", 404);
    }

    const password = await bcrypt.compare(loginRequest.password, user.password);

    if (!password) {
      throw new ResponseError("Invalid username or password", 404);
    }

    const token = JwtToken.generateToken(
      user.id,
      process.env.SECRET_KEY!,
      "1h"
    );

    return {
      name: user.name,
      username: user.username,
      token: token,
    };
  }
}