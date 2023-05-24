import express from "express";

import {
  createUserHandler,
  getAllUsersHandler,
  loginHandler,
  updateUserHandler,
  getOneUserHandler,
  deleteUserHandler,
} from "../controllers/user.controllers";

import {
  Schemas,
  idValidator,
  schemasValidator,
} from "../../middleware/validators";
import { verifyAdmin, verifyToken } from "../../middleware/verifyToken";

const router = express.Router();

router.post(
  "/create",
  // verifyAdmin,
  schemasValidator(Schemas.user.create),
  createUserHandler
);

router.get("/get", getAllUsersHandler);

router.get("/get/:id", idValidator, getOneUserHandler);

router.put(
  "/update/:id",
  // verifyAdmin,
  idValidator,
  schemasValidator(Schemas.user.update),
  updateUserHandler
);

router.delete("/delete/:id", idValidator, deleteUserHandler);
router.post("/login", schemasValidator(Schemas.user.login), loginHandler);

export default router;
