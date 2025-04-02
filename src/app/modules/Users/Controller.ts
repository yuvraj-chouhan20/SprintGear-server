import { Request, Response, NextFunction } from "express";
import BaseController from "../Base/Controller";
import User from "./Model";

class UserController extends BaseController{
  constructor(req: Request, res: Response, next: NextFunction){
    super(req, res, next);
  }

  async login() {
    try {
      const { email, password } = this.req.body;
      const user: User | null = await User.findOne({ where: { email } });
      if (!user) {
        return this.res.status(404).send({ message: "User not found" });
      }
      // const isPasswordValid = await bcrypt.compare(password, user.password);
      // if (!isPasswordValid) {
      //   return this.res.status(401).json({ message: "Invalid password" });
      // }
      this.res.send({ message: "Login successful" });

    } catch (error) {
      console.log("Error in login", error);
      this.res.send({status: false, message: error});
    }
  }

  async register() {
    try{
      const data = this.req.body;
      const user: User | null = await User.findOne({ where: { email: data.email } });
      if(user){
        return this.res.status(409).send({status: false, message: "User already exists"});
      }

      const newsUser: User | null = await User.create(data);
      if(newsUser){
        return this.res.status(201).send({status: true, message: "User created successfully"});
      }
      this.res.status(500).send({status: false, message: "Failed to create user"});
    }catch(error){
      console.log("Error in register", error);
      this.next(error);
    }
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