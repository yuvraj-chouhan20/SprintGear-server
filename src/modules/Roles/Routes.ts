import { Application, Router, Response, NextFunction } from "express";
import RoleController from "./Controller";
import Auth from "../../services/middlewares/auth";
import { RequestType } from "../../types/requestTypes";

export default function(app: Application){
  const router = Router();

  router.post('/role/create', async (req: RequestType, res: Response, next: NextFunction) => {
    const roleObj: RoleController = new RoleController(req, res, next);
    await roleObj.createRole();
  });

  router.post("/roles", Auth.isAuthorized, async( req: RequestType, res: Response, next: NextFunction) =>{
    const roleObj: RoleController = new RoleController(req, res, next);
    await roleObj.getRoles();
  })

  return router;
}