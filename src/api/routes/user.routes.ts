import express from "express";

import {
  createUser,
  deleteUser,
  login,
  readAllUsers,
  readUser,
  updateUser,
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
  verifyAdmin,
  schemasValidator(Schemas.user.create),
  createUser
);

router.get("/get", verifyToken, readAllUsers);

router.get("/get/:id", verifyToken, idValidator, readUser);

router.put(
  "/update/:id",
  verifyAdmin,
  idValidator,
  schemasValidator(Schemas.user.update),
  updateUser
);

router.delete("/delete/:id", verifyAdmin, idValidator, deleteUser);
router.post("/login", schemasValidator(Schemas.user.login), login);

export default router;
