import { Router } from "express";

import { AuthController } from "./authController";
import { AuthMiddleware } from "./authMiddleware";
const router: Router = Router();
const authController: AuthController = new AuthController();
const authMiddleware: AuthMiddleware = new AuthMiddleware();
export function AuthRoute(passport: any) {
  router.post("/signup", authController.userSignup);
  router.post(
    "/signin",
    authMiddleware.authenticateUser(passport),
    authController.userLogin
  );
  return router;
}
