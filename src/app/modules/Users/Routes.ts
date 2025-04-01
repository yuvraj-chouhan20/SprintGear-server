import { NextFunction, Request, Response, Router } from "express";
import UserController from "./Controller";
export default () => {

  const router: Router = Router();

  router.post('/user/login', (req: Request, res: Response, next: NextFunction) => {
    const userObj: UserController = new UserController(req, res, next);
    return userObj.login();
  });

  router.post('/user/register', (req: Request, res: Response, next: NextFunction) => {
    const userObj: UserController = new UserController(req, res, next);
    return userObj.register();
  });

  router.get('/user/profile', (req: Request, res: Response, next: NextFunction) => {
    const userObj: UserController = new UserController(req, res, next);
    return userObj.profile();
  });

  router.post("/user/forget-password", (req: Request, res: Response, next: NextFunction) => {
    const userObj: UserController = new UserController(req, res, next);
    return userObj.forgetPassword();
  });

  router.post("/user/reset-password", (req: Request, res: Response, next: NextFunction) => {
    const userObj: UserController = new UserController(req, res, next);
    return userObj.resetPassword();
  });

  return router;
};