import { prisma } from "../app/database";
import { ResponseError } from "../error/response-error";
import type {
  RefreshRequest,
  UserRequest,
  UserResponse,
} from "../model/user-model";
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
      process.env.ACCESS_SECRET_KEY!,
      "20m"
    );

    const refreshToken = JwtToken.generateToken(
      user.id,
      process.env.REFRESH_SECRET_KEY!,
      "7d"
    );

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refresh_token: refreshToken,
      },
    });

    return {
      name: user.name,
      username: user.username,
      token: token,
      refreshToken: refreshToken,
    };
  }

  static async refresh(req: RefreshRequest): Promise<UserResponse> {
    const refreshRequest = validate(UserValidation.REFRESH, req);

    const payload = JwtToken.verifyToken(
      refreshRequest.token,
      process.env.REFRESH_SECRET_KEY!
    );

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (
      payload === null ||
      user === null ||
      user.refresh_token !== refreshRequest.token
    ) {
      throw new ResponseError("Invalid token", 401);
    }

    const token = JwtToken.generateToken(
      user.id,
      process.env.ACCESS_SECRET_KEY!,
      "20m"
    );

    return {
      name: user.name,
      username: user.username,
      token: token,
    };
  }

  static async logout(userId: number): Promise<void> {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token: null,
      },
    });
  }

  static async me(userId: number): Promise<UserResponse> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        username: true,
        role: true,
        created_at: true
      }
    });

    return user!;
  }
}
