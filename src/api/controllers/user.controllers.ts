import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";

import userModel, { UserDocument } from "../Models/user.model";
import { signJwt } from "../../utils/jwt";
import {
  DupError,
  createDuplicateKeyError,
} from "../../utils/createDuplicateKeyError";

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const exists = await userModel.findOne({
      username: req.body.username.toLowerCase(),
    });
    if (exists)
      return next(
        createHttpError(409, `Username ${req.body.username} already in use`)
      );

    const user = new userModel(req.body);

    user.save();
    res.status(200).json(user);
  } catch (error) {
    const err = error as DupError;

    if (err.code === 11000) {
      const message = createDuplicateKeyError(err);
      return next(createHttpError(409, message));
    }
    next(error);
  }
};

export const readAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const readUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser: RequestHandler<
  { id: string },
  unknown,
  UserDocument
> = async (req, res, next) => {
  try {
    const { username } = req.body;
    await userModel.findByIdAndUpdate(req.params.id, {
      ...req.body,
      username: username && username.toLowerCase(),
    });

    res.status(200).json("updated");
  } catch (error) {
    next(error);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted");
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler<
  unknown,
  unknown,
  UserDocument,
  unknown
> = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username: username.toLowerCase() });
  if (!user) {
    return next(createHttpError(400, "Invalid credentials"));
  }
  const match = await user.comparePasswords(password);

  if (!match) {
    return next(createHttpError(400, "Invalid credentials"));
  }

  const token = signJwt({ id: user.id });

  res.status(200).json({
    token,
    user: user.username,
    isAdmin: user.isAdmin,
  });
};
