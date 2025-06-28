import { Request, Response } from "express";
import { jwt_Params, StatusCode } from "../types/types";
import jwt, { JwtPayload } from "jsonwebtoken";

const accessSecret = process.env.JWT_ACCESS_SECRET!;
const refreshSecrect = process.env.JWT_REFRESH_SECRET!;
export const generateAcceToken = (payload: jwt_Params) => {
  return jwt.sign(payload, accessSecret, { expiresIn: "2h" });
};
export const generateRefreshToken = (payload: jwt_Params) => {
  return jwt.sign(payload, refreshSecrect, { expiresIn: "7d" });
};
export const generatenewAccessToken = (req: Request, res: Response) => {
  const { role } = req.params;
  const userRole = `${role}_refreshToken`;
  const refreshToken = req.cookies[userRole];

  if (!refreshToken) {
    return res
      .status(StatusCode.UNAUTHORIZED)
      .json({ message: "Refresh Token not found" });
  }

  jwt.verify(
    refreshToken,
    refreshSecrect,
    (err: jwt.VerifyErrors | null, decode: jwt.JwtPayload | string | undefined) => {
      if (err || !decode) {
        return res
          .status(StatusCode.FORBIDDEN)
          .json({ message: "Invalid Refresh Token" });
      }

      const { id,role  } = decode as jwt_Params;

      const newAccessToken = generateAcceToken({id,role}); // use cleaned payload

      return res.json({ accessToken: newAccessToken });
    }
  );
};
