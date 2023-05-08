import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import router from "./api";

const app = express();

// Middleware
app.use(cors());

app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);

app.use(notFound);
app.use(errorHandler);

export default app;
