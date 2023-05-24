import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import memberModel, {
  MemberDocument,
  MemberInput,
} from "../models/member.model";

export const createMember = async (input: MemberInput) => {
  try {
    return await memberModel.create<MemberInput>(input);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getAllMembers = async () => {
  try {
    return await memberModel.find({});
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getOneMember = async (
  query: FilterQuery<MemberDocument>,
  options: QueryOptions = { lean: true }
) => {
  try {
    return await memberModel.findOne(query, null, options);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateMember = async (
  query: FilterQuery<MemberDocument>,
  update: UpdateQuery<MemberInput>
) => {
  try {
    return await memberModel.findOneAndUpdate<MemberInput>(query, update);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const deleteMember = async (query: FilterQuery<MemberDocument>) => {
  try {
    await memberModel.findByIdAndDelete(query);
    return "Deleted";
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
