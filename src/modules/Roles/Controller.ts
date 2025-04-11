import { NextFunction, Response } from "express";
import BaseController from "../Base/Controller";
import { Role } from "./Model";
import CommonService from "../../services/Global/common";
import { HTTP_CODE } from "../../services/Global/constant";
import { RequestType } from "../../types/requestTypes";

class RoleController extends BaseController<RequestType>{
  constructor(req: RequestType, res: Response, next: NextFunction){
    super(req, res, next);
  }

  async createRole(){
    try {
      const { title, permissions }: {title: string, permissions: []} = this.req.body;

      const  staticKey: string = title.toLowerCase().split(' ').join('-');
      const alreadyExistRole: Role | null = await Role.findOne({ where: { staticKey, isDeleted: false } });
      if(alreadyExistRole){
        return CommonService.handleResponse(this.res, "ROLE_ALREADY_EXISTS", HTTP_CODE.CONFLICT_CODE, HTTP_CODE.FAILED);
      }
      const role: Role = await Role.create({ title, staticKey, permissions, createdBy: this.req?.currentUser?._id, updatedBy: this.req?.currentUser?._id });
      return CommonService.handleResponse(this.res, "ROLE_CREATED", HTTP_CODE.SUCCESS_CODE, HTTP_CODE.SUCCESS, {role});
    } catch (error) {
      console.log("Error in createRole", error);
      this.next(error);
    }
  }

  async getRoles(){
    try {
      const query = { isDeleted: false, status: true };
      const roles: Role[] = await Role.findAll({ where: query });
      return CommonService.handleResponse(this.res, "ROLES_FETCHED", HTTP_CODE.SUCCESS_CODE, HTTP_CODE.SUCCESS, {roles});
    } catch (error) {
      console.log("Error in getAllRoles", error);
      this.next(error);
    }
  }


  async getRoleListing(){
    try {
      const data: {page: number, pageSize: number, searchText?: string, filters?: []} = this.req.body;
      const page = data.page;
      const limit = data.pageSize;
      const skip = ( page - 1 ) * limit;
      const query: any = { isDeleted: false};
      const searchText: string | undefined = data.searchText;
      const andQuery = [];
      const filters = data.filters;

      if(searchText){
        andQuery.push({ $or:[{
          title: {
            like: "%" + searchText + "%"
          }}
        ]})
      }

      if(filters && filters.length > 0){
        
      }

      if(this.req.currentUser?.Role?.staticKey !== "super-admin"){
        query['createdBy'] = this.req.currentUser?._id;
        query['updatedBy'] = this.req.currentUser?._id;
      }


      const roles: Role[] = await Role.findAll({where: query, limit, offset: skip});
      return CommonService.handleResponse(this.res, "ROLES_FETCHED", HTTP_CODE.SUCCESS_CODE, HTTP_CODE.SUCCESS, roles);
    } catch (error) {
      console.log("Error in getRoleListing", error);
      this.next(error);
    }
  }
}

export default RoleController;