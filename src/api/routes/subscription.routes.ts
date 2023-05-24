import express from "express";

import {
  createSubscriptionHandler,
  getAllSubscriptionsHandler,
  updateSubscriptionHandler,
  getOneSubscriptionHandler,
  deleteSubscriptionHandler,
} from "../controllers/subscription.controllers";

import { idValidator } from "../../middleware/validators";

const router = express.Router();

router.post(
  "/create",
  // verifyAdmin,
  createSubscriptionHandler
);

router.get("/get", getAllSubscriptionsHandler);

router.get("/get/:id", idValidator, getOneSubscriptionHandler);

router.put(
  "/update/:id",
  // verifyAdmin,
  idValidator,
  updateSubscriptionHandler
);

router.delete("/delete/:id", idValidator, deleteSubscriptionHandler);

export default router;
