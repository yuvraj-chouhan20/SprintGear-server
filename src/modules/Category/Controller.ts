import { NextFunction, Request, Response } from "express";
import BaseController from "../Base/Controller";
import CommonService from "../../services/Global/common";
import { Category } from "./Model";
import { HTTP_CODE } from "../../services/Global/constant";
import Service from "./Service";

export default class CategoryController extends BaseController<Request>{
  constructor(req: Request, res: Response, next: NextFunction){
    super(req, res, next);
  }

  /**
   * Add category
   * @returns
   */
  async addCategory(): Promise<Response | void>{
    try {
      const processBody = ["title", "parentCategory_id"];
      const processedData = CommonService.processBody(processBody, this.req.body);
      const response: Category | Error = await new Service().handleAddCategory(processedData);
      console.log(this.res)
      return CommonService.handleResponse(this.res, "SUCCESS", HTTP_CODE.SUCCESS_CODE, HTTP_CODE.SUCCESS, response);
    } catch (error) {
      console.log("Error in addCategory", error);
      this.next(error);
    }
  }

  /**
   * Get categoryies listing
   */

  async categoryListing(): Promise<Response | void>{
    try {
      const processBody = ["page", "pageSize", "searchText", "filters"];
      const processedData = CommonService.processBody(processBody, this.req.body);
      const response: Category[] | [] = await new Service().handleCategoryListing(processedData);
      return CommonService.handleResponse(this.res, "SUCCESS", HTTP_CODE.SUCCESS_CODE, HTTP_CODE.SUCCESS, response);
    } catch (error) {
      console.log("Error in categoryListing", error);
      this.next(error);
    }
  }

  async updateCategory(): Promise<Response | void>{
    try {
      const { id } = this.req.params;
      console.log("params", id)
      const processBody = ["status", "title"]
      const processedData = CommonService.processBody(processBody, this.req.body);
      const response: number | Error = await new Service().handleUpdateCategory({...processedData, id});
      return CommonService.handleResponse(this.res, "SUCCESS", HTTP_CODE.SUCCESS_CODE, HTTP_CODE.SUCCESS);
    } catch (error) {
      console.log("Error in updateCategory", error);
      this.next(error);
    }
  }

  async deleteCategory(): Promise<Response| void>{
    try{
      const { id } = this.req.params;
      const response: number | Error = await new Service().handleDeleteCategory(id);
      return CommonService.handleResponse(this.res, "SUCCESS", HTTP_CODE.SUCCESS_CODE, HTTP_CODE.SUCCESS);
    } catch(error){
      console.log("Error in deleteCategory", error);
      this.next(error);
    }
  }

  async getCategories(): Promise<Response| void>{
    try {
      const processBody = ["searchText"]
      const processedData = CommonService.processBody(processBody, this.req.body);
      const response: Category[] | [] = await new Service().handleGetCategories(processedData);
      return CommonService.handleResponse(this.res, "SUCCESS", HTTP_CODE.SUCCESS_CODE, HTTP_CODE.SUCCESS, response);
    } catch (error) {
      console.log("Error in getCategories", error);
      this.next(error);
    }
  }
}