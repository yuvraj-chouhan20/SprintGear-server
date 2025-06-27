import { Application, Router, Request, Response, NextFunction } from "express";
import Auth from "../../services/middlewares/auth";
import VariantController from "./Controller";

export default function(app: Application){
  const router = Router()

  router.post("/variant-template", Auth.isAuthorized, async ( req: Request, res: Response, next: NextFunction) => {
    const variantTemplateObj = new VariantController(req, res, next);
    await variantTemplateObj.addVariantTemplate();
  })

  return router;
}