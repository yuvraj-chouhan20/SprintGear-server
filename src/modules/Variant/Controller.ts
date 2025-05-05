import CommonService from "../../services/Global/common";
import BaseController from "../Base/Controller";
import { NextFunction, Request, Response } from "express";

class Controller extends BaseController<Request>{
  constructor(req: Request, res: Response, next: NextFunction){
    super(req, res, next);
  }

  /**
   * Handle add variant
   */
  async addVariant(){
    const processBody = ["title", "category_id"];
    const processedData = CommonService.processBody(processBody, this.req.body);
    
  }
}