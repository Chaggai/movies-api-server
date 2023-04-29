import { Document, Schema, model } from "mongoose";

export interface MovieDocument extends Document {
  name: string;
  genres: string[];
  image: string;
  premiered: string;
}

export const movieSchema = new Schema({
  name: { type: String, required: true },
  genres: [{ type: String, required: true }],
  image: { type: String, required: true },
  premiered: { type: String, required: true },
});

movieSchema.pre("save", async function (next) {
  const user = this as MovieDocument;
  if (!user.isModified("premiered")) {
    return next();
  }
  return next();
});

export default model<MovieDocument>("Movie", movieSchema);
