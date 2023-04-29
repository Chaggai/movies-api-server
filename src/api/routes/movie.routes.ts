import express from "express";

import {
  createMovie,
  readAllMovies,
  readMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.controllers";
import {
  Schemas,
  idValidator,
  schemasValidator,
} from "../../middleware/validators";
import { verifyPermission, verifyToken } from "../../middleware/verifyToken";
import { Permissions } from "../Models/user.model";

const router = express.Router();

router.get("/get", verifyToken, readAllMovies);

router.get("/get/:id", verifyToken, idValidator, readMovie);

router.post(
  "/create",
  verifyPermission(Permissions.CREATE),
  schemasValidator(Schemas.movie.create),
  createMovie
);

router.put(
  "/update/:id",
  idValidator,
  verifyPermission(Permissions.CREATE),
  schemasValidator(Schemas.movie.update),
  updateMovie
);

router.delete(
  "/delete/:id",
  idValidator,
  verifyPermission(Permissions.DELETE),
  deleteMovie
);

export default router;
