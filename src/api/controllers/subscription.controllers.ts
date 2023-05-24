import { RequestHandler } from "express";
import { omit } from "lodash";
import createError from "http-errors";

import subscriptionModel, {
  SubscriptionDocument,
} from "../models/subscription.model";
import {
  createSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getOneSubscription,
  updateSubscription,
} from "../services/subscription.srvices";

export const createSubscriptionHandler: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const createdSubscription = await createSubscription(req.body);
    res.send(createSubscription);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllSubscriptionsHandler: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const allSubscriptions = await getAllSubscriptions();
    res.status(200).send(allSubscriptions);
  } catch (error: any) {
    next(error);
  }
};

export const getOneSubscriptionHandler: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const subscription = await getOneSubscription({ _id: req.params.id });

    if (!subscription) {
      return next(createError.NotFound("Subscription not found"));
    }

    res.send(subscription);
  } catch (error: any) {
    next(error);
  }
};

export const updateSubscriptionHandler: RequestHandler<
  { id: string },
  unknown,
  SubscriptionDocument
> = async (req, res, next) => {
  try {
    await updateSubscription({ _id: req.params.id }, req.body);
    res.send("Subscription updated");
  } catch (error: any) {
    next(error);
  }
};

export const deleteSubscriptionHandler: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    await deleteSubscription({ _id: req.params.id });
    res.send("Subscription deleted");
  } catch (error: any) {
    console.log(error);
    return res.status(409).send(error.message);
  }
};
