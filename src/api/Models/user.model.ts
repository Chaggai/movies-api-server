import { Document, ObjectId, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export enum Permissions {
  CREATE = "create",
  DELETE = "delete",
}

export interface UserInput {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  isAdmin: boolean;
  permissions: Permissions[];
}

export interface UserDocument extends UserInput, Document<ObjectId> {
  comparePasswords(password: string): Promise<boolean>;
}

const userSchema = new Schema(
  {
    username: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    permissions: { type: [String], require: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (this: UserDocument, next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;
  this.username = this.username.toLowerCase();

  return next();
});

userSchema.methods.comparePasswords = async function (
  password: string
): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(password, user.password).catch(() => false);
};

export default model<UserDocument>("User", userSchema);
