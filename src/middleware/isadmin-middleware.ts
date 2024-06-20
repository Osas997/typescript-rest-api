import type { NextFunction, Response } from "express";
import { type Request as JWTRequest } from "express-jwt";
import { prisma } from "../app/database";
import { ResponseError } from "../error/response-error";

export const isAdmin = async (
  req: JWTRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.auth!.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (!user) {
      throw new ResponseError("User not found", 404);
    }

    if (user.role !== "ADMIN") {
      throw new ResponseError("Unauthorized", 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};
