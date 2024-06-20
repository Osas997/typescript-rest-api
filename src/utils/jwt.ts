import jwt from "jsonwebtoken";

export class JwtToken {
  public static generateToken(
    userId: number,
    secretKey: string,
    expiresIn: string
  ): string {
    return jwt.sign({ id: userId }, secretKey, { expiresIn: expiresIn });
  }
}
