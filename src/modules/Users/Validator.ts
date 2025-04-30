import * as Joi from "joi";
import CommonService from "../../services/Global/common";
import { NextFunction, Request, Response } from "express";
import { HTTP_CODE } from "../../services/Global/constant";


/**
 * Validate create user request
 * @param req request object
 * @param res response object
 * @param next next function
 * @returns void
 */
class Validator{
  static async validateCreateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const schema =  Joi.object({
      fullName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      mobile: Joi.number().integer().min(10).required(),
      age: Joi.number().integer(),
      gender: Joi.string(),
    })
    const { error, value } = schema.validate(req.body);
    if (error) {
      CommonService.handleResponse(res, error.message, HTTP_CODE.UNPROCESSABLE_ENTITY, false);
      return;
    }
    req.body = value;
    next();
  }

  /**
   * Validate get users request
   * @param req request object
   * @param res response object
   * @param next next function
   * @returns void
   */
  static async validatedGetUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    const schema =  Joi.object({
      page: Joi.number().integer().required().min(1),
      pageSize: Joi.number().integer().required().min(1),
      searchText: Joi.string().allow(null).allow(undefined).allow(''),
    })
    const { error, value } = schema.validate(req.body);
    if (error) {
      CommonService.handleResponse(res, error.message, HTTP_CODE.UNPROCESSABLE_ENTITY, false);
      return;
    }
    req.body = value;
    next();
  }
}

export default Validator;
