import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import subscriptionModel, {
  SubscriptionDocument,
  SubscriptionInput,
} from "../models/subscription.model";

export const createSubscription = async (input: SubscriptionInput) => {
  try {
    return await subscriptionModel.create<SubscriptionInput>(input);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getAllSubscriptions = async () => {
  try {
    return await subscriptionModel.find({});
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getOneSubscription = async (
  query: FilterQuery<SubscriptionDocument>,
  options: QueryOptions = { lean: true }
) => {
  try {
    return await subscriptionModel.findOne(query, null, options);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateSubscription = async (
  query: FilterQuery<SubscriptionDocument>,
  update: UpdateQuery<SubscriptionInput>
) => {
  try {
    return await subscriptionModel.findOneAndUpdate<SubscriptionInput>(
      query,
      update
    );
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const deleteSubscription = async (
  query: FilterQuery<SubscriptionDocument>
) => {
  try {
    await subscriptionModel.findByIdAndDelete(query);
    return "Deleted";
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
