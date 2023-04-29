import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Joi, { ObjectSchema } from "joi";
import { joiPasswordExtendCore } from "joi-password";
import createHttpError from "http-errors";

const joiPassword = Joi.extend(joiPasswordExtendCore);

import { UserDocument } from "../api/Models/user.model";
import { MovieDocument } from "../api/Models/movie.model";

export const schemasValidator = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      const err = error as Error;

      next(createHttpError(422, err.message));
    }
  };
};

export const Schemas = {
  movie: {
    create: Joi.object<MovieDocument>({
      name: Joi.string().min(2).required(),
      genres: Joi.array().items(Joi.string().min(3).required()).required(),
      image: Joi.string().uri().required(),
      premiered: Joi.date().required(),
    }),
    update: Joi.object<MovieDocument>({
      name: Joi.string().min(2),
      genres: Joi.array().items(Joi.string().min(3)),
      image: Joi.string().min(10),
      premiered: Joi.date(),
    }),
  },
  user: {
    create: Joi.object<UserDocument>({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      username: Joi.string().min(3).max(10).required(),
      password: joiPassword
        .string()
        .min(8)
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .required(),
      permissions: Joi.array()
        .items(Joi.string().valid("create", "delete"))
        .required(),
    }),
    update: Joi.object<UserDocument>({
      firstname: Joi.string(),
      lastname: Joi.string(),
      username: Joi.string().min(3).max(10),
      permissions: Joi.array().items(Joi.string().valid("create", "delete")),
    }),
    login: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
};

export const idValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return next(createHttpError(400, "Invalid ObjectId"));
  }
  next();
};
