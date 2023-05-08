import express from "express";
import usersRoutes from "./routes/user.routes";
import moviesRoutes from "./routes/movie.routes";

const router = express.Router();
router.use("/users", usersRoutes);
router.use("/movies", moviesRoutes);

export default router;
