import { RequestHandler } from "express";
import { omit } from "lodash";
import createError from "http-errors";

import movieModel, { MovieDocument } from "../models/movie.model";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getOneMovie,
  updateMovie,
} from "../services/movie.srvices";

export const createMovieHandler: RequestHandler = async (req, res, next) => {
  try {
    const createdMovie = await createMovie(req.body);
    res.send(createdMovie);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllMoviesHandler: RequestHandler = async (req, res, next) => {
  try {
    const allMovies = await getAllMovies();
    res.status(200).send(allMovies);
  } catch (error: any) {
    next(error);
  }
};

export const getOneMovieHandler: RequestHandler = async (req, res, next) => {
  try {
    const movie = await getOneMovie({ _id: req.params.id });

    if (!movie) {
      return next(createError.NotFound("Movie not found"));
    }

    res.send(movie);
  } catch (error: any) {
    next(error);
  }
};

export const updateMovieHandler: RequestHandler<
  { id: string },
  unknown,
  MovieDocument
> = async (req, res, next) => {
  try {
    await updateMovie({ _id: req.params.id }, req.body);
    res.send("Movie updated");
  } catch (error: any) {
    next(error);
  }
};

export const deleteMovieHandler: RequestHandler = async (req, res, next) => {
  try {
    await deleteMovie({ _id: req.params.id });
    res.send("Movie deleted");
  } catch (error: any) {
    console.log(error);
    return res.status(409).send(error.message);
  }
};
