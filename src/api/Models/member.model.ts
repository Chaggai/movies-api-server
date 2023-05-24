import { Document, ObjectId, Schema, model } from "mongoose";

export interface MemberInput {
  name: string;
  email: string;
  city: string;
}

export interface MemberDocument extends MemberInput, Document<ObjectId> {}

const memberSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  city: { type: String, require: true },
});

export default model<MemberDocument>("Member", memberSchema);
