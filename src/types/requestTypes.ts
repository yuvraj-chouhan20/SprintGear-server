import { Request } from "express";
import { Attributes, CreationAttributes, InferAttributes } from "sequelize";

import { Role } from "../modules/Roles/Model";
import { User } from "../modules/Users/Model";
import { Variant, VariantTemplate } from "../modules/Variant/Model";

export interface RequestType extends Request {
  currentUser?: JwtPayloadType;
}

export interface JwtPayloadType extends InferAttributes<User, {omit: "password"} & { passwordResetToken: string | null, passwordResetTokenExpiration: Date | null, address: {line1: string, line2: string, city: string, state: string, country: string, zipCode: string}, gender: 'male' | 'female' | 'other'}>{
  Role: InferAttributes<Role>
};

export interface Pagination{
  page: number,
  pageSize: number,
  searchText?: string
  filters?: [],
}
