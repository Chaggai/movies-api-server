import env from "./validateEnv";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const { JWT_SECRET } = env;

export const signJwt = (object: Object, options?: SignOptions) => {
  return jwt.sign({ ...object }, JWT_SECRET, {
    ...options,
    algorithm: "HS256",
  });
};

export const verifyJwt = (token: string) => {
  try {
    const decoded: string | JwtPayload = jwt.verify(token, JWT_SECRET);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    const err = error as Error;
    return {
      valid: false,
      expired: err.message === "jwt expired",
      decoded: null,
    };
  }
};
