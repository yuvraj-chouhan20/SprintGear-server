import { InferAttributes } from "sequelize";
import User from "../modules/Users/Model";
import { Role } from "../modules/Roles/Model";

export interface UserType extends InferAttributes<User, {omit: "password"} & {passwordResetToken: string | null, passwordResetTokenExpiration: Date | null, address: {line1: string, line2: string, city: string, state: string, country: string, zipCode: string}, gender: 'male' | 'female' | 'other'}>{
  _id: string;
  role: InferAttributes<Role>;
}