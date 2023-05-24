import express from "express";

import {
  createMemberHandler,
  getAllMembersHandler,
  updateMemberHandler,
  getOneMemberHandler,
  deleteMemberHandler,
} from "../controllers/member.controllers";

import { idValidator } from "../../middleware/validators";

const router = express.Router();

router.post(
  "/create",
  // verifyAdmin,
  createMemberHandler
);

router.get("/get", getAllMembersHandler);

router.get("/get/:id", idValidator, getOneMemberHandler);

router.put(
  "/update/:id",
  // verifyAdmin,
  idValidator,
  updateMemberHandler
);

router.delete("/delete/:id", idValidator, deleteMemberHandler);

export default router;
