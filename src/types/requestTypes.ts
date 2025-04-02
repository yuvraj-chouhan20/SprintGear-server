import { Request } from "express";
import User from "../modules/Users/Model";
import { InferAttributes } from "sequelize";
import { JwtPayload } from "jsonwebtoken";

export interface RequestType extends Request {
  currentUser?: JwtPayload | string;
}