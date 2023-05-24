import { Document, ObjectId, Schema, model } from "mongoose";

export interface SubscriptionInput {
  memberId: string;
  movies: { momieId: string; date: Date }[];
}

export interface SubscriptionDocument
  extends SubscriptionInput,
    Document<ObjectId> {}

const subscriptionSchema = new Schema({
  memberId: { type: String, unique: true, require: true },
  movies: [{ movieId: Schema.Types.ObjectId, date: Date }],
});

export default model<SubscriptionDocument>("Subscription", subscriptionSchema);
