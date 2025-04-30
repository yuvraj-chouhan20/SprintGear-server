import { Request, Response, NextFunction, Application, Router } from "express";

export default function(app: Application){
  const router: Router = Router();

  router.post('/product/create', async (req: Request, res: Response, next: NextFunction) => {
    
  });
  return router;
}
