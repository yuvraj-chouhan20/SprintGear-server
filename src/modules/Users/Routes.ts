import { NextFunction, Request, Response, Router, Application } from "express";
import UserController from "./Controller";
import Validator from "./Validator";

export default (app: Application) => {

  const router: Router = Router();

  router.post('/user/login', async (req: Request, res: Response, next: NextFunction) => {
    const userObj: UserController = new UserController(req, res, next);
    await userObj.login();
  });

  router.post('/user/register', Validator.validateCreateUser, async (req: Request, res: Response, next: NextFunction) => {
    const userObj: UserController = new UserController(req, res, next);
    await userObj.register();
  });

  router.get('/user/profile', async (req: Request, res: Response, next: NextFunction) => {
    const userObj: UserController = new UserController(req, res, next);
    await userObj.profile();
  });

  router.post("/user/forget-password", async (req: Request, res: Response, next: NextFunction) => {
    const userObj: UserController = new UserController(req, res, next);
    await userObj.forgetPassword();
  });

  router.post("/user/reset-password", async (req: Request, res: Response, next: NextFunction) => {
    const userObj: UserController = new UserController(req, res, next);
    await userObj.resetPassword();
  });

  // app.use('/user', router);
  return router;
};