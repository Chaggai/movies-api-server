import { Document, ObjectId, Schema, model } from "mongoose";

export interface MovieInput {
  name: string;
  genres: string[];
  image: string;
  premiered: string;
}

export interface MovieDocument extends MovieInput, Document<ObjectId> {}

export const movieSchema = new Schema({
  name: { type: String, required: true },
  genres: [{ type: String, required: true }],
  image: { type: String, required: true },
  premiered: { type: String, required: true },
});

export default model<MovieDocument>("Movie", movieSchema);
