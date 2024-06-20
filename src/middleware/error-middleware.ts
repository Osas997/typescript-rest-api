import type { NextFunction, Request, Response } from "express";
import { ResponseError } from "../error/response-error";
import { ZodError } from "zod";
import { UnauthorizedError } from "express-jwt";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ResponseError) {
    res.status(error.status).json({
      error: error.message,
    });
  } else if (error instanceof ZodError) {
    res.status(422).json({
      error: error.errors,
    });
  } else if (error instanceof UnauthorizedError) {
    res.status(error.status).json({
      error: error.code,
    });
  } else {
    res.status(500).json({
      error: error.message,
    });
  }
};
