import { Request } from "express";
import { InferAttributes } from "sequelize";
import { User } from "../modules/Users/Model";
import { Role } from "../modules/Roles/Model";

export interface RequestType extends Request {
  currentUser?: JwtPayloadType;
}

export interface JwtPayloadType extends InferAttributes<User, {omit: "password"} & { passwordResetToken: string | null, passwordResetTokenExpiration: Date | null, address: {line1: string, line2: string, city: string, state: string, country: string, zipCode: string}, gender: 'male' | 'female' | 'other'}>{
  Role: InferAttributes<Role>
};