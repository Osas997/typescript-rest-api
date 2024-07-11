import jwt from "jsonwebtoken";
import { ResponseError } from "../error/response-error";

interface JwtPayload {
  id: number;
}

export class JwtToken {
  public static generateToken(
    userId: number,
    secretKey: string,
    expiresIn: string
  ): string {
    return jwt.sign({ id: userId }, secretKey, { expiresIn: expiresIn });
  }

  public static verifyToken(token: string, secretKey: string): JwtPayload {
    try {
      return jwt.verify(token, secretKey) as JwtPayload;
    } catch (error) {
      throw new ResponseError("Invalid token", 401);
    }
  }
}
