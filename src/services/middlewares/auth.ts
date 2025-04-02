import { Response, NextFunction } from "express";
import CommonService from "../Global/common";
import { HTTP_CODE } from "../Global/constant";
import { RequestType } from "../../types/RequestTypes";

class Auth{
  async isAuthorized(req: RequestType, res: Response, next: NextFunction){
    try {
      const token = req.headers.authorization;
      if(!token){
        return CommonService.handleResponse(res, "UNAUTHORIZED", HTTP_CODE.UNAUTHORIZED_CODE, HTTP_CODE.FAILED);
      }
      const decodedToken = await CommonService.verifyToken(token);
      if(decodedToken){
        req.currentUser = decodedToken;
        next();
      }
      return CommonService.handleResponse(res, "", HTTP_CODE.UNAUTHORIZED_CODE, HTTP_CODE.FAILED)
    } catch (error) {
      console.log("Error in isAuthorized", error);
      next(error);
    }
  }
}

export default Auth;
