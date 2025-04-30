import { Response, NextFunction } from "express";
import CommonService from "../Global/common";
import { HTTP_CODE } from "../Global/constant";
import { JwtPayloadType, RequestType } from "../../types/requestTypes";
import AuthService from "../Auth/auth";
import { JwtPayload } from "jsonwebtoken";

class Auth{
  static async isAuthorized(req: RequestType, res: Response, next: NextFunction): Promise<void>{
    try {
      const token = req.headers.authorization;
      if(!token){
        CommonService.handleResponse(res, "TOKEN_REQUIRED", HTTP_CODE.UNAUTHORIZED_CODE, HTTP_CODE.FAILED);
        return
      }
      const decodedToken: string | JwtPayloadType = await AuthService.verifyToken(token);
      if(!decodedToken && typeof decodedToken == "string"){
        CommonService.handleResponse(res, "INVALID_TOKEN", HTTP_CODE.UNAUTHORIZED_CODE, HTTP_CODE.FAILED);
        return;
      }
      if(decodedToken && typeof decodedToken !== "string"){
        req.currentUser = decodedToken;
        next();
      }
    } catch (error) {
      console.log("Error in isAuthorized", error);
      CommonService.handleResponse(res, "INVALID_TOKEN", HTTP_CODE.UNAUTHORIZED_CODE, HTTP_CODE.FAILED)
      return;
    }
  }
}

export default Auth;
