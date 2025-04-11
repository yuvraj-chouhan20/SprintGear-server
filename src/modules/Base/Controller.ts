import { NextFunction, Request, Response } from "express";
import { RequestType } from "../../types/requestTypes";

class BaseController<T extends Request | RequestType>{
  req: T;
  res: Response;
  next: NextFunction;
  constructor(req: T, res: Response, next: NextFunction){
    this.req = req;
    this.res = res;
    this.next = next;
  }
}

export default BaseController;