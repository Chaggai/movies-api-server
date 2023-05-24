import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import movieModel, { MovieDocument, MovieInput } from "../models/movie.model";

export const createMovie = async (input: MovieInput) => {
  try {
    return await movieModel.create<MovieInput>(input);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getAllMovies = async () => {
  try {
    return await movieModel.find({});
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getOneMovie = async (
  query: FilterQuery<MovieDocument>,
  options: QueryOptions = { lean: true }
) => {
  try {
    return await movieModel.findOne(query, null, options);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateMovie = async (
  query: FilterQuery<MovieDocument>,
  update: UpdateQuery<MovieInput>
) => {
  try {
    return await movieModel.findOneAndUpdate<MovieInput>(query, update);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const deleteMovie = async (query: FilterQuery<MovieDocument>) => {
  try {
    await movieModel.findByIdAndDelete(query);
    return "Deleted";
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
