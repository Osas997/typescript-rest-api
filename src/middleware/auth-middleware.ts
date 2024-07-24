import type { NextFunction, Response } from "express";
import type { Request as JwtRequest } from "express-jwt";
import { prisma } from "../app/database";
import { ResponseError } from "../error/response-error";

export const authMiddleware = async (
  req: JwtRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.auth!.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ResponseError("User not found", 404);
    }

    next();
  } catch (error) {
    next(error);
  }
};
