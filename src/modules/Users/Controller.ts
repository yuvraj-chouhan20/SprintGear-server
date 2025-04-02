import { Request, Response, NextFunction } from "express";
import BaseController from "../Base/Controller";
import User from "./Model";
import CommonService from "../../services/Global/common";
import { HTTP_CODE } from "../../services/Global/constant";

class UserController extends BaseController{
  constructor(req: Request, res: Response, next: NextFunction){
    super(req, res, next);
  }

  async login() {
    try {
      const processBody = ["email", "password"];
      const processedData = CommonService.processBody(processBody, this.req.body);
      const user: User | null = await User.findOne({ where: { email: processedData.email } });
      if (!user) {
        return CommonService.handleResponse(this.res, "USER_NOT_FOUND", HTTP_CODE.NOT_FOUND_CODE, HTTP_CODE.FAILED);
      }
      // const isPasswordValid = await bcrypt.compare(password, user.password);
      // if (!isPasswordValid) {
      //   return this.res.status(401).json({ message: "Invalid password" });
      // }
      console.log(user)
      CommonService.handleResponse(this.res, "LOGIN_SUCCESS", HTTP_CODE.SUCCESS_CODE, HTTP_CODE.SUCCESS, user);

    } catch (error) {
      console.log("Error in login", error);
      this.res.send({status: false, message: error});
    }
  }

  async register() {
    try{
      const data = this.req.body;

      const processBody = [
        "fullName",
        "email",
        "password",
        "age",
        "gender",
        "mobile",
        "address",
      ]

      const processedData = CommonService.processBody(processBody, data);
      const user: User | null = await User.findOne({ where: { email: processedData.email, isDeleted: false } });
      if(user){
        return CommonService.handleResponse(this.res, "USER_EXIST", HTTP_CODE.CONFLICT_CODE, HTTP_CODE.FAILED);
      }

      const newsUser: User | null = await User.create(processedData);
      if(newsUser){
        return CommonService.handleResponse(this.res, "CREATED_SUCCESSFULLY", HTTP_CODE.RESOURCE_CREATED_CODE, HTTP_CODE.SUCCESS);
      }
      CommonService.handleResponse(this.res, "FAILED_TO_CREATE_USER", HTTP_CODE.SERVER_ERROR_CODE, HTTP_CODE.FAILED);
    }catch(error){
      console.log("Error in register", error);
      this.next(error);
    }
  }

  async profile(){
    CommonService.handleResponse(this.res, "USER_NOT_FOUND", HTTP_CODE.NOT_FOUND_CODE, HTTP_CODE.FAILED)
  }

  async forgetPassword(){
    CommonService.handleResponse(this.res, "USER_NOT_FOUND", HTTP_CODE.NOT_FOUND_CODE, HTTP_CODE.FAILED)
  }

  async resetPassword(){
    CommonService.handleResponse(this.res, "USER_NOT_FOUND", HTTP_CODE.NOT_FOUND_CODE, HTTP_CODE.FAILED)
  }
}

export default UserController;