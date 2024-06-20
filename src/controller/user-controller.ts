import type { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user-service";
import type { UserRequest } from "../model/user-model";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as UserRequest;
      const user = await UserService.register(request);

      res.status(201).json({
        data: {
          name: user.name,
          username: user.username,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as UserRequest;
      const user = await UserService.login(request);

      res.status(200).json({
        data: {
          name: user.name,
          username: user.username,
          token: user.token,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
