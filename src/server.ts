import "dotenv/config";
import createError from "http-errors";
import mongoose from "mongoose";

import env from "./utils/validateEnv";
import app from "./app";
import seeder from "./utils/seeder";

const { PORT, MONGO_URI, NODE_ENV } = env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    // Seeder
    if (NODE_ENV === "development") {
      seeder();
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error: Error) => createError.InternalServerError);
