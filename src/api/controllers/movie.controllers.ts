import { RequestHandler } from "express";

import MovieModel, { MovieDocument } from "../models/movie.model";

export const createMovie: RequestHandler<
  unknown,
  unknown,
  MovieDocument,
  unknown
> = async (req, res, next) => {
  try {
    const movie = new MovieModel(req.body);
    movie.save();
    res.status(201).json(movie);
  } catch (error) {
    next(error);
  }
};

export const readAllMovies: RequestHandler = async (req, res, next) => {
  try {
    const movies = await MovieModel.find({});
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

export const readMovie: RequestHandler = async (req, res, next) => {
  try {
    const movie = await MovieModel.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};

export const updateMovie: RequestHandler<
  { id: string },
  unknown,
  MovieDocument
> = async (req, res, next) => {
  try {
    const updatedMovie = await MovieModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );

    res.status(200).json(updatedMovie);
  } catch (error) {
    next(error);
  }
};

export const deleteMovie: RequestHandler = async (req, res, next) => {
  try {
    await MovieModel.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted");
  } catch (error) {
    next(error);
  }
};
