import { NextFunction, Request, Response, Router, Application } from "express";
import UserController from "./Controller";
export default (app: Application) => {

  const router: Router = Router();

  router.post('/user/login', async (req: Request, res: Response, next: NextFunction) => {
    const userObj: UserController = new UserController(req, res, next);
    await userObj.login();
  });

  router.post('/user/register', async (req: Request, res: Response, next: NextFunction) => {
    const userObj: UserController = new UserController(req, res, next);
    await userObj.register();
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

  // app.use('/user', router);
  return router;
};