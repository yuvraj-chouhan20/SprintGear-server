import { Request, Response, NextFunction } from "express";
import BaseController from "../Base/Controller";

class UserController extends BaseController{
  constructor(req: Request, res: Response, next: NextFunction){
    super(req, res, next);
  }

  async login(){
    this.res.send('login');
  }

  async register(){
    this.res.send('register');
  }

  async profile(){
    this.res.send('profile');
  }

  async forgetPassword(){
    this.res.send('forgetPassword');
  }

  async resetPassword(){
    this.res.send('resetPassword');
  }
}

export default UserController;