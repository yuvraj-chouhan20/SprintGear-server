import { NextFunction, Request, Response } from "express";
import BaseController from "../Base/Controller";

export default class ProductController extends BaseController<Request>{
  constructor(req: Request, res: Response, next: NextFunction){
    super(req, res, next);
  }

  /**
   * Create product
   * @returns 
   */
  async createProduct(){
    try {
      const data = this.req.body;
      
    } catch (error) {
      
    }
  }
}