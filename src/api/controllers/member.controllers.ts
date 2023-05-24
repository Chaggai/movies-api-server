import { RequestHandler } from "express";
import { omit } from "lodash";
import createError from "http-errors";

import { MemberDocument } from "../models/member.model";
import {
  createMember,
  deleteMember,
  getAllMembers,
  getOneMember,
  updateMember,
} from "../services/member.srvices";

export const createMemberHandler: RequestHandler = async (req, res, next) => {
  try {
    const createdMember = await createMember(req.body);
    res.send(createdMember);
  } catch (error) {
    next(error);
  }
};

export const getAllMembersHandler: RequestHandler = async (req, res, next) => {
  try {
    const allMembers = await getAllMembers();
    res.status(200).send(allMembers);
  } catch (error: any) {
    next(error);
  }
};

export const getOneMemberHandler: RequestHandler = async (req, res, next) => {
  try {
    const member = await getOneMember({ _id: req.params.id });

    if (!member) {
      return next(createError.NotFound("Member not found"));
    }

    res.send(member);
  } catch (error: any) {
    next(error);
  }
};

export const updateMemberHandler: RequestHandler<
  { id: string },
  unknown,
  MemberDocument
> = async (req, res, next) => {
  try {
    await updateMember({ _id: req.params.id }, req.body);
    res.send("Member updated");
  } catch (error: any) {
    next(error);
  }
};

export const deleteMemberHandler: RequestHandler = async (req, res, next) => {
  try {
    await deleteMember({ _id: req.params.id });
    res.send("Member deleted");
  } catch (error: any) {
    console.log(error);
    return res.status(409).send(error.message);
  }
};
