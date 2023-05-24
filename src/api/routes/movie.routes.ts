import express from "express";

import {
  createMovieHandler,
  getAllMoviesHandler,
  updateMovieHandler,
  getOneMovieHandler,
  deleteMovieHandler,
} from "../controllers/movie.controllers";

import { idValidator } from "../../middleware/validators";

const router = express.Router();

router.post(
  "/create",
  // verifyAdmin,
  createMovieHandler
);

router.get("/get", getAllMoviesHandler);

router.get("/get/:id", idValidator, getOneMovieHandler);

router.put(
  "/update/:id",
  // verifyAdmin,
  idValidator,
  updateMovieHandler
);

router.delete("/delete/:id", idValidator, deleteMovieHandler);

export default router;
