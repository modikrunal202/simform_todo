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
  router.get('/google-signin', authController.googleSignIn)
  router.get("/google", passport.authenticate("google", { scope: ["email", "profile"]}), authController.userLogin)
  router.get("/google/callback", authMiddleware.authenticateGoogleUsers(passport), authController.userLogin)
  return router;
}
