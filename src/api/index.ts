import express from "express";
import usersRoutes from "./routes/user.routes";
import moviesRoutes from "./routes/movie.routes";
import membersRoutes from "./routes/member.routes";
import subscriptionsRoutes from "./routes/subscription.routes";

const router = express.Router();
router.use("/users", usersRoutes);
router.use("/movies", moviesRoutes);
router.use("/members", membersRoutes);
router.use("/subscriptions", subscriptionsRoutes);

export default router;
