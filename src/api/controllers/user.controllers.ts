import { RequestHandler } from "express";
import { omit } from "lodash";
import createError from "http-errors";

import userModel, { UserDocument } from "../models/user.model";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getOneUser,
  login,
  updateUser,
} from "../services/user.srvices";

export const createUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const exists = await userModel.findOne({
      username: req.body.username.toLowerCase(),
    });
    if (exists) {
      return next(
        createError.Conflict(`Username ${req.body.username} already in use`)
      );
    }

    const createdUser = await createUser(req.body);
    res.send(omit(createdUser.toJSON(), "password"));
  } catch (error) {
    next(error);
  }
};

export const getAllUsersHandler: RequestHandler = async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();
    const allUsersWithoutPassword = allUsers.map((user) =>
      omit(user.toJSON(), "password")
    );
    res.status(200).send(allUsersWithoutPassword);
  } catch (error: any) {
    next(error);
  }
};

export const getOneUserHandler: RequestHandler = async (req, res, next) => {
  try {
    const user = await getOneUser({ _id: req.params.id });

    if (!user) {
      return next(createError.NotFound("User not found"));
    }

    res.send(omit(user, "password"));
  } catch (error: any) {
    next(error);
  }
};

export const updateUserHandler: RequestHandler<
  { id: string },
  unknown,
  UserDocument
> = async (req, res, next) => {
  try {
    await updateUser({ _id: req.params.id }, req.body);
    res.send("User updated");
  } catch (error: any) {
    next(error);
  }
};

export const deleteUserHandler: RequestHandler = async (req, res, next) => {
  try {
    await deleteUser({ _id: req.params.id });
    res.send("User deleted");
  } catch (error: any) {
    console.log(error);
    return res.status(409).send(error.message);
  }
};

export const loginHandler: RequestHandler<{}, {}, UserDocument> = async (
  req,
  res,
  next
) => {
  try {
    const token = await login({
      username: req.body.username,
      password: req.body.password,
    });

    res
      .status(200)
      .send({ token, user: token.username, isAdmin: token.isAdmin });
  } catch (error: any) {
    next(error);
  }
};
