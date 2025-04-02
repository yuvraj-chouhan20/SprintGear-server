import config from "../../config/config";
import {  Response, Request } from "express"
import i18n from 'i18n';
import jwt from "jsonwebtoken";
import User from "../../modules/Users/Model";

class CommonService{

  /**
   * 
   * @param res response object
   * @param message message to send
   * @param status status code
   * @param resStatus response status
   * @param data data to send
   * @returns 
   */
  static handleResponse(res: Response, message: string, status:number, resStatus: boolean, data?: any){
    return res
            .status(status)
            .send({status: resStatus, message: i18n.__(message), data});
  }


  /**
   * @param processBody array of keys to process from request body
   * @param reqBody request body
   * @returns processed data
   */
  static processBody(processBody: string[], reqBody: Request['body']){
    return processBody.reduce((acc: any, key: string) => {
      if (reqBody[key]) {
        acc[key] = reqBody[key];
      }
      return acc;
    }, {});
  }

}

export default CommonService;