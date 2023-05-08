import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import userModel, { UserDocument, UserInput } from "../models/user.model";
import { signJwt } from "../../utils/jwt";
import createError from "http-errors";

export const createUser = async (input: UserInput) => {
  try {
    return await userModel.create<UserInput>(input);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getAllUsers = async () => {
  try {
    return await userModel.find({});
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getOneUser = async (
  query: FilterQuery<UserDocument>,
  options: QueryOptions = { lean: true }
) => {
  try {
    return await userModel.findOne(query, null, options);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateUser = async (
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserInput>
) => {
  try {
    return await userModel.findOneAndUpdate<UserInput>(query, update);
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const deleteUser = async (query: FilterQuery<UserDocument>) => {
  try {
    await userModel.findByIdAndDelete(query);
    return "Deleted";
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const user = await getOneUser({ username }, { lean: false });

    if (!user) {
      return createError.NotFound("User not found");
    }

    const match = await user.comparePasswords(password);

    if (!match) {
      return createError.Conflict("Faild to login");
    }

    const token = signJwt({ id: user._id }, { expiresIn: "3d" });

    return {
      token,
      id: user._id,
      isAdmin: user.isAdmin,
      username: user.username,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
