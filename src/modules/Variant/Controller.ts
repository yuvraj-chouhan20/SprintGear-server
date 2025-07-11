import { NextFunction, Request, Response } from "express";
import { InferAttributes, Model } from "sequelize";

import BaseController from "../Base/Controller";
import CommonService from "../../services/Global/common";
import Service from "./Service";
import { VariantTemplate } from "./Model";
import { HTTP_CODE } from "../../services/Global/constant";


class Controller extends BaseController<Request>{
  constructor(req: Request, res: Response, next: NextFunction){
    super(req, res, next);
  }

  /**
   * Handle add variant Template
   *
   */
  async addVariantTemplate(){
    const processBody = ["title", "category_id"];
    const processedData = CommonService.processBody(processBody, this.req.body);
    const response: Model<VariantTemplate> | Error = await new Service().handleAddVariantTemplate(processedData);
    return CommonService.handleResponse(this.res, "SUCCESS", HTTP_CODE.SUCCESS_CODE, HTTP_CODE.SUCCESS, response);
  }

  /** ?
   * Handler Variant details
  */

  async variantTemplateListing(){
    const processBody = ['page', 'pageSize', "filter"];
    const processedData = CommonService.processBody(processBody, this.req.body);
    const response: InferAttributes<VariantTemplate>[] | [] = await new Service().handleVariantTemplateListing();
  }
}

export default Controller;