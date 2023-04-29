import { Errback, NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";

export const errorHandler = (
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errorMessage = "Somthing went wrong";
  let statusCode = 500;

  if (isHttpError(err)) {
    statusCode = err.status;
    errorMessage = err.message;
  }

  res.status(statusCode).json(errorMessage);
};
