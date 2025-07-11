import { NextFunction, Request, Response } from "express";
import { BadRequestError, ConflictError, FailedError, NotFoundError } from "../../Utils/Errors";
import { HTTP_CODE } from "../Global/constant";
import CommonService from "../Global/common";

const ErrorMiddleWare = (error: Error, req: Request, res: Response, next: NextFunction) => {
  const errorMessage = error.message || "Something went wrong";

  if(error instanceof BadRequestError){
    CommonService.handleResponse(res, errorMessage, HTTP_CODE.BAD_REQUEST_CODE, false);
    return;
  }
  else if(error instanceof NotFoundError){
    CommonService.handleResponse(res, errorMessage, HTTP_CODE.NOT_FOUND_CODE, false);
    return;
  }
  else if(error instanceof ConflictError){
    CommonService.handleResponse(res, errorMessage, HTTP_CODE.CONFLICT_CODE, false);
    return;
  }
  else if(error instanceof FailedError){
    CommonService.handleResponse(res, errorMessage, HTTP_CODE.BAD_REQUEST_CODE, false);
    return;
  }
  CommonService.handleResponse(res, errorMessage, HTTP_CODE.SERVER_ERROR_CODE, false);
}

export default ErrorMiddleWare;
