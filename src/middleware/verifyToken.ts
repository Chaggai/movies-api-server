import createError from "http-errors";
import { NextFunction, Request, RequestHandler, Response } from "express";
import userModel, { Permissions, UserDocument } from "../api/models/user.model";
import { verifyJwt } from "../utils/jwt";

interface Indexed extends Request {
  [key: string]: any;
}

export const verifyToken: RequestHandler = async (req: Indexed, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(createError.Unauthorized());
  }

  const [, token] = authorization.split(" ");

  try {
    const { valid, decoded } = verifyJwt(token);
    if (!valid) {
      return next(createError.Unauthorized());
    }
    const { id } = decoded as { id: string };

    req.user = await userModel.findById(id);

    next();
  } catch (error) {
    next(error);
  }
};

export const verifyAdmin: RequestHandler = async (req: Indexed, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user?.isAdmin) {
      return next(createError.Unauthorized());
    }
    next();
  });
};

export const verifyPermission =
  (permission: Permissions) =>
  (req: Indexed, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
      const user: UserDocument = req.user;
      const verified = user?.permissions?.some((per) => per === permission);
      if (!verified) {
        return next(createError.Unauthorized());
      }
      next();
    });
  };
